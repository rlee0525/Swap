# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  description :text             not null
#  price       :integer          not null
#  img_url1    :string           not null
#  img_url2    :string
#  category_id :integer          not null
#  course_id   :integer
#  zip_code    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  title       :string           not null
#  img_url3    :string
#  condition   :string           not null
#  views       :integer          default(1)
#

FactoryGirl.define do
  factory :post do
    title "My Post Title"
    user
    description "Some description"
    price 12
    img_url1 "some_url"
    img_url2 "some_url"
    img_url3 "some_url"
    condition "Brand New"
    category
    course
    zip_code "99999"
  end
end
