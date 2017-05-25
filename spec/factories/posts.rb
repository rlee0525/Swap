# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text             not null
#  category    :string           not null
#  price       :integer          not null
#  img_url1    :string           not null
#  img_url2    :string
#  img_url3    :string
#  course_id   :integer
#  views       :integer          default(1)
#  active      :boolean          default(TRUE)
#  deleted     :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
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
    category "Course Material"
    course
    active true
    deleted false
  end
end
