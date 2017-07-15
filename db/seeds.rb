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
  edu_email: "raylee0525@gmail.com",
  edu_email_confirmed: true,
  university: University.first,
  fb_picture: ENV['RAYMOND_FB_PICTURE'],
  first_name: ENV['RAYMOND_FIRST_NAME'],
  last_name: ENV['RAYMOND_LAST_NAME']
)

