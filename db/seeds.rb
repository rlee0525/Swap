require_relative("posts")
require("csv")

categories = ['Textbooks', 'Clothing', 'Furniture', 'Electronics',
              'Kitchenware', 'Games']
universities = [['Berkeley', 'berkeley.edu']]
conditions = ["Brand New", "Like New", "Used"]


categories.each do |name|
  Category.create!(
    name: name
  )
end

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
  fb_id: "10209361793984589",
  edu_email: "bob@berkeley.edu",
  university: University.first
)

User.create!(
  fb_id: "10155319625093824",
  edu_email: "bobby@berkeley.edu",
  university: University.first
)

100.times do |idx|
  category = Category.find(rand(1..Category.count))
  if category
    course = Course.find(rand(1..Course.count))
  else
    course = nil
  end

  Post.create!(
    user: User.find(rand(1..User.count)),
    title: Posts::DATA[idx % 29][:title],
    description: Posts::DATA[idx % 29][:description],
    price: rand(100) + 1,
    img_url1: Posts::DATA[idx % 29][:img_url1],
    img_url2: Posts::DATA[idx % 29][:img_url2],
    img_url3: Posts::DATA[idx % 29][:img_url3],
    category: category,
    course: course,
    zip_code: rand(0..9999).to_s,
    condition: conditions.sample
  )
end

User.all.each do |user|
  Post.all.each do |post|
    Bookmark.create(user: user, post: post)
  end
end
