require("CSV")

categories = ['Textbooks', 'Clothing', 'Furniture', 'Electronics',
              'Kitchenware', 'Games']

universities = [['Berkeley', 'berkeley.edu']]

conditions = ["Brand New", "Like New", "Used"]

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
    img_url1: "http://res.cloudinary.com/dkympkwdz/image/upload/ar_3,c_fill,g_auto,h_700,q_80,w_700/f_jpg/mf6ghcrtjehu98usjcra.jpg",
    img_url2: "http://res.cloudinary.com/dkympkwdz/image/upload/ar_3,c_fill,g_auto,h_700,q_80,w_700/f_jpg/mf6ghcrtjehu98usjcra.jpg",
    img_url3: "http://res.cloudinary.com/dkympkwdz/image/upload/ar_3,c_fill,g_auto,h_700,q_80,w_700/f_jpg/mf6ghcrtjehu98usjcra.jpg",
    category: Category.find(rand(1..Category.count)),
    course: Course.find(rand(1..Course.count)),
    zip_code: rand(0..9999).to_s,
    condition: conditions.sample
  )
end

100.times do
  Bookmark.create!(
    user: User.find(rand(1..User.count)),
    post: Post.find(rand(1..Post.count))
  )
end

User.all.each do |user|
  Post.all.each do |post|
    Bookmark.create(user: user, post: post)
  end
end


# Post.create!( user: User.first,
# title: "Nintendo",
# description: "sdf",
# price: rand(100) + 1,
# img_url1: "https://robohash.org/#{rand(1000)}",
# img_url2: "https://robohash.org/#{rand(1000)}",
# img_url3: "https://robohash.org/#{rand(1000)}",
#
# category: Category.find(rand(1..Category.count)),
# course: Course.find(rand(1..Course.count)),
# zip_code: rand(0..9999).to_s,
# condition: "Brand New" )
