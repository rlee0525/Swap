require_relative("posts")
require("csv")

AppKey.create!(
  app: 'firebase',
  variables: ENV['FIREBASE_CONFIG']
)

categories = ['Course Material', 'Clothing', 'Furniture', 'Electronics',
              'Lost & Found', 'Bikes', 'Housing', 'Games', 'Others']
universities = [['Berkeley', 'berkeley.edu']]

universities.each do |name, email_extension|
  University.create!(
    name: name,
    email_extension: email_extension
  )
end

data = CSV.read("scraper/data.csv", encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all)
course_objects = data.map(&:to_hash)

course_objects.each do |course_object|
  Course.create!(
    university: University.first,
    course_name: course_object[:course_title],
    course_number: course_object[:course_number]
  )
end

User.create!(
  fb_id: ENV["RAYMOND_FB_ID"],
  edu_email: "bob@berkeley.edu",
  university: University.first,
  fb_picture: ENV['RAYMOND_FB_PICTURE'],
  first_name: ENV['RAYMOND_FIRST_NAME'],
  last_name: ENV['RAYMOND_LAST_NAME']
)

User.create!(
  fb_id: ENV['RANDY_FB_ID'],
  edu_email: "bobby@berkeley.edu",
  university: University.first,
  fb_picture: ENV['RANDY_FB_PICTURE'],
  first_name: ENV['RANDY_FIRST_NAME'],
  last_name: ENV['RANDY_LAST_NAME']
)

User.create!(
  fb_id: ENV['DAVID_FB_ID'],
  edu_email: "bobbybobby@berkeley.edu",
  university: University.first,
  fb_picture: ENV['DAVID_FB_PICTURE'],
  first_name: ENV['DAVID_FIRST_NAME'],
  last_name: ENV['DAVID_LAST_NAME']
)

50.times do |idx|
  category = categories.sample
  course = nil
  start_date = nil
  end_date = nil
  lat = nil
  lng = nil
  address = nil
  price = rand(100) + 1

  if category == "Course Material"
    course = Course.find(rand(1..Course.count))
  end

  if category == "Housing"
    address = "Stern Hall, Berkeley, CA 94720"
    lat = 37.874853 + rand(-0.01..0.01).round(6)
    lng = -122.255458 + rand(-0.01..0.01).round(6)
    start_date = Time.now + rand(1000000..1000000)
    end_date = Time.now + rand(1000000..10000000)
  end

  if category == "Lost & Found"
    price = nil
  end
  
  Post.create!(
    user: User.find(rand(1..User.count)),
    title: Posts::DATA[idx % 29][:title],
    description: Posts::DATA[idx % 29][:description],
    price: price,
    img_url1: Posts::DATA[idx % 29][:img_url1],
    img_url2: Posts::DATA[idx % 29][:img_url2],
    img_url3: Posts::DATA[idx % 29][:img_url3],
    category: category,
    course: course,
    address: address,
    lat: lat,
    lng: lng,
    start_date: start_date,
    end_date: end_date,
    updated_at: rand(0..4320).minutes.ago
  )
end

User.all.each do |user|
  Post.all.each do |post|
    Bookmark.create(user: user, post: post)
  end

  idx = 0
  5.times do |i|
    idx += 1 + rand(0..1000)
    user.courses << Course.find(idx)
  end
end

User.all.each do |user|
  user.courses.each do |course|
    20.times do
      course.posts << Post.find(rand(1..200))
    end
  end
end


Conversation.create!(
  conversation_id: "10156026345623475-10209361793984589",
  user_id: "10156026345623475"
)

Conversation.create!(
  conversation_id: "10156026345623475-10209361793984589",
  user_id: "10209361793984589"
)
