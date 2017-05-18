# == Schema Information
#
# Table name: courses
#
#  id            :integer          not null, primary key
#  university_id :integer          not null
#  course_name   :string           not null
#  course_number :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Course < ApplicationRecord
  include SearchCop

  search_scope :search do
    attributes :course_number
  end

  validates :university, :course_name, :course_number, presence: true
  has_many :posts, inverse_of: :course
  belongs_to :university

end
