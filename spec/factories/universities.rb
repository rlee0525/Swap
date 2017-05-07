# == Schema Information
#
# Table name: universities
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email_extension :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

FactoryGirl.define do
  factory :university do
    name "Berkeley"
    email_extension "berkeley.edu"
  end
end
