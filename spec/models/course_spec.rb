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

require 'rails_helper'

RSpec.describe Course, type: :model do
  describe "validations" do
    it { should validate_presence_of(:university) }
    it { should validate_presence_of(:course_name) }
  end

  describe "associations" do
    it { should have_many(:posts) }
    it { should belong_to(:university) }
  end
end
