# == Schema Information
#
# Table name: users_courses
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UsersCourse < ApplicationRecord
  validates :user, :course, presence: true
  belongs_to :user
  belongs_to :course

  validates :user, uniqueness: { scope: :course }

  has_many :posts, through: :course
end
