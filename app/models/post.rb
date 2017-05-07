# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  description :text             not null
#  price       :integer          not null
#  img_url1    :string           not null
#  img_url2    :string           not null
#  category_id :integer          not null
#  course_id   :integer          not null
#  zip_code    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Post < ApplicationRecord
  validates :user, :description,
            :price, :img_url1, :img_url2,
            :category, :course, :zip_code, presence: true
  belongs_to :category
  belongs_to :course
  belongs_to :user
end
