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

FactoryGirl.define do
  factory :course do
    university
    course_name "Math 101"
    course_number "MATH1A"
  end
end
