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
#  course_id   :integer          not null
#  zip_code    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  title       :string           not null
#  img_url3    :string
#  condition   :string           not null
#

class Post < ApplicationRecord
  validates :user, :description,
            :price, :img_url1, :category,
            :condition, :course, :zip_code, presence: true
  validates :condition, inclusion: { in: ["Brand New", "Like New", "Used"],
            message: "%{value} is not a valid condition" }
  belongs_to :category
  belongs_to :course
  belongs_to :user
end
