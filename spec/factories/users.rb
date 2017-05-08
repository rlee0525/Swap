# == Schema Information
#
# Table name: users
#
#  id                      :integer          not null, primary key
#  fb_id                   :integer          not null
#  edu_email               :string
#  university_id           :integer          not null
#  marketing_opt_in        :boolean          default("true"), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  fb_email                :string
#  edu_email_confirmed     :boolean          default("false")
#  edu_email_confirm_token :string
#

FactoryGirl.define do
  factory :user do
    fb_id 123
    edu_email '123@berkeley.edu'
    university
  end
end
