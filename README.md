# Swap

Visit [Swap](http://www.swapnow.io) and start swapping today!

![Home Page](https://res.cloudinary.com/rlee0525/image/upload/v1503336813/sn_yipy08.png)

## About Swap

Swap is a free online platform that allows students to connect with fellow classmates and exchange goods.

Swap allows students to post items they don’t need while giving others the opportunity to find exactly what they want. We offer exclusivity, convenience, and specialized features which are not available on conventional forums or typical free and for sale message boards. One such features, allows students to enter their courses to find items that are directly related. This makes finding textbooks, lab equipment, and other course material seamless and tailored to individual students needs.

As hungry students themselves, the founders of Swap wanted to contribute to the community and provide a platform where students can connect and add to their school life. As an exclusive marketplace for Berkeley students, it is safer, more local, and more convenient.

For more information, send an email to swapnowio@gmail.com.

## Features & Highlights

### OAuth - Secure and Easy

Utilized Facebook SDK, Koala gem, and regex matching to create easy and secure marketplace. Only students with university email addresses will be able to sign up and swap with each other.

<img src="https://res.cloudinary.com/rlee0525/image/upload/c_scale,h_400/v1503337705/Screen_Shot_2017-08-21_at_10.47.42_AM_mwd2e2.png" alt="oauth" style="width: 49%" />
<img src="https://res.cloudinary.com/rlee0525/image/upload/c_scale,h_400,w_1005/v1503337705/Screen_Shot_2017-08-21_at_10.47.59_AM_ctxgya.png" alt="regex" style="width: 49%" />

```Ruby
class ApplicationController < ActionController::Base
  def fb_id(access_token)
    graph = Koala::Facebook::API.new(access_token)
    profile = graph.get_object("me")
    return profile["id"]
  rescue
    return nil
  end

  def fb_auth_user(access_token)
    user = nil
    begin
      graph = Koala::Facebook::API.new(access_token)
      profile = graph.get_object("me")
      fb_id = profile["id"]
      user = User.find_by(fb_id: fb_id)
    rescue
      return nil
    end

    if user && (user.fb_picture.nil? || user.first_name.nil? || user.last_name.nil?)
      first_name, last_name = profile["name"].split(" ")
      fb_picture = graph.get_picture(fb_id)
      user.update(
        fb_picture: fb_picture,
        first_name: first_name,
        last_name: last_name
      )
    end
    user
  end
end
```

### Web Scraper - Courses

Utilized Nokogiri gem to scrape courses directly from UC Berkeley. Students can add all their courses and easily search for posts only related to those courses.

```Ruby
require 'HTTParty'
require 'Nokogiri'
require 'JSON'
require 'Pry'
require 'CSV'
require_relative "links"

data = []

Links.links.each do |link|
  page = HTTParty.get(link)

  parse_page = Nokogiri::HTML(page)

  parse_page.css('.courseblocktitle').map do |course|
    parsed_course = {
      course_number: course.css('.code').text,
      course_title: course.css('.title').text
    }
    data.push(parsed_course)
  end
end

Pry.start(binding)

CSV.open("data.csv", "wb") do |csv|
  csv << data.first.keys
  data.each do |hash|
    csv << hash.values
  end
end
```

<img src="https://res.cloudinary.com/rlee0525/image/upload/c_scale,h_400,w_878/v1503338998/Screen_Shot_2017-08-21_at_11.09.39_AM_lponjo.png" alt="my-courses1" style="width: 49%" />
<img src="https://res.cloudinary.com/rlee0525/image/upload/c_scale,h_400,w_878/v1503338997/Screen_Shot_2017-08-21_at_11.06.01_AM_iiwxja.png" alt="my-courses2" style="width: 49%" />

### Search & Pagination

**Grid View / List View**
- Customized search parameters.
- Sort postings by title, date, price, and views.

<img src="https://res.cloudinary.com/rlee0525/image/upload/v1503339234/Screen_Shot_2017-08-21_at_11.13.12_AM_jtp9al.png" alt="search3" style="width: 42%; height: 400px" />
<img src="https://res.cloudinary.com/rlee0525/image/upload/v1503340050/Screen_Shot_2017-08-21_at_11.27.13_AM_kwbrap.png" alt="search4" style="width: 42%; height: 400px" />

**Post Detail View**
- Utilized Google API for address and maps and AirBnB npm for the calendar.
- Users can bookmark posts and save links to send it to their friends.

<img src="https://res.cloudinary.com/rlee0525/image/upload/v1503339781/Screen_Shot_2017-08-21_at_11.22.41_AM_ni3pcl.png" alt="detail1" style="width: 42%; height: 400px" />
<img src="https://res.cloudinary.com/rlee0525/image/upload/v1503339954/Screen_Shot_2017-08-21_at_11.25.04_AM_nf9riq.png" alt="detail2" style="width: 42%; height: 400px" />

**RFP (Request For Posts)**
- Users can add custom alerts to get emails whenever a post related to the created keywords is created.

```Ruby
class Post < ApplicationRecord
  validates :user, :description,
            :img_url1, :title, 
            :category, presence: true

  validates_presence_of :price, :if => Proc.new { |post| post.category != 'Lost & Found' }
  validates_presence_of :address, :lat, :lng, :start_date, :end_date, :if => Proc.new { |post| post.category == 'Housing' }

  has_many :bookmarks
  belongs_to :course, inverse_of: :posts, optional: true
  belongs_to :user

  after_create :check_rfps

  def check_rfps
    Rfp.all.each do |rfp|
      check_relevance(rfp.description, rfp.user)
    end
  end

  def check_relevance(description, user)
    post = self.as_json
    relevance_score = calc_score(post, description)
    if relevance_score >= 10
      UserMailer.rfp_alert(user, post, description).deliver
    end
  end

  private

  def calc_score(post, query)
    query = query.split(' ')
    score = 0
    max = 0

    query.each do |word|
      max += word.length
      if post['title'].downcase.include? word.downcase
        score += word.length
      end
    end

    score
  end
end
```

**Messages**
- Utilized Firebase DB to store conversations and polling to update messages received.
- Checks the last message of each conversation and updates whether it has been delivered / seen.
- Message templates are dynamically generated for every posts allowing users to easily copy and send.

<img src="https://res.cloudinary.com/rlee0525/image/upload/v1503340813/Screen_Shot_2017-08-21_at_11.38.42_AM_btrmln.png" alt="messages1" style="width: 42%; height: 400px" />
<img src="https://res.cloudinary.com/rlee0525/image/upload/v1503340813/Screen_Shot_2017-08-21_at_11.39.10_AM_v08xij.png" alt="messages2" style="width: 42%; height: 400px" />

**Responsive Design**
- This app is built with responsiveness in mind. Multiple break points are set to render different ontents at different window widths including mobile views.

## Technology
Swap utilized multiple technologies.

### Languages
* **TypeScript**
* **JavaScript**
* **Ruby**

### Frontend
Swap is a single page app.

The following is a list of some of the technologies used to create the Swap frontend.

* **React.js** was the framework used for the entirety of the front end.
* **Redux** was utilized to store the bulk of the data needed on the client-side, and to trigger API calls as needed.
* **Sass** was used to better organize the CSS.
* **jQuery** was used for ajax calls.
* **Webpack** was used to bundle and minify javascript files.
* **Babel** was used to translate jsx into javascript.
* **Bootstrap** was used to construct skeleton desgin.

### Backend
Swap makes asynchronous http requests to the back end to create, fetch, update, and delete data.

The following is a list of some of the technologies used to create the Swap backend.

* **Ruby on Rails** was the framework used for the back end, creating models that interact with the database, controllers that contain methods to respond to http requests, a router that maps routes to those controller methods, and jbuilder views to respond to requests with JSON data.
* **PostgreSQL, Firebase** were used to store data.
* **Heroku** was used to host Swap.
* **Cloudinary** was used to store images.
