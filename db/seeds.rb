categories = %w(Textbooks Male Clothing Female
                Clothing Furniture Electronics Kitchenware Games)
universities = [['Berkeley', 'berkeley.edu']]

courses = [['Public Speaking', 'ENG1A']]

descriptions = [
  'Take your game sessions up a notch with the Nintendo Switch Pro Controller. Includes motion controls, HD rumble, built-in amiibo functionality, and more.',
  'Throw an impromptu party anywhere with anyone thanks to a new play style in which players look at each other-not the screen! Bring the action and fun into the real world as you face off in wild-west duels, cow-milking competitions, a copycat dance-off. While the action unfolds off- screen, the audience watches the players themselves instead of the screen. That makes it as hilarious to watch as it is to play - an instant party amplifier!',
  'Specifically designed for Nintendo Switch. Ultra-clear High Definition with 99.9% transparency to allow an optimal, natural viewing experience. Ultra thin-0.3mm thickness is reliable and resilient, and promises full compatibility with touchscreen sensitivity. Highly durable, and scratch resistant - surface hardness 9H and topped with oleophobic coating to reduce fingerprints. Includes: 2x GLASS Screen Protector, Wet/Dry Wipes, Squeeze Card, Easy Installation Use Guide, Dust Removal Stickers'
]

titles = [
  'Nintendo Switch',
  'Math 100 Textbook',
  'Twin Mattress'
]

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

courses.each do |course_name, course_number|
  Course.create!(
    university: University.first,
    course_name: course_name,
    course_number: course_number
  )
end

User.create!(
  fb_id: 1,
  edu_email: "bob@berkeley.edu",
  university: University.first
)

100.times do
  Post.create!(
    user: User.first,
    title: titles.sample,
    description: descriptions.sample,
    price: rand(100) + 1,
    img_url1: "https://robohash.org/#{rand(1000)}",
    img_url2: "https://robohash.org/#{rand(1000)}",
    category: Category.find(rand(Category.count) + 1),
    course: Course.find(rand(Course.count) + 1),
    zip_code: rand(9999) + 1
  )
end
