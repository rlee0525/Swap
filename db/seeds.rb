require_relative("posts")
require("csv")

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
  fb_id: ENV['RAYMOND_FB_ID'],
  edu_email: "bob@berkeley.edu",
  university: University.first
)

User.create!(
  fb_id: ENV['RANDY_FB_ID'],
  edu_email: "bobby@berkeley.edu",
  university: University.first
)

200.times do |idx|
  category = categories.sample
  course = nil
  if category == "Course Material"
    course = Course.find(rand(1..Course.count))
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
    created_at: rand(0..4320).minutes.ago
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
