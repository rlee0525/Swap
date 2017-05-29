# == Schema Information
#
# Table name: users
#
#  id                      :integer          not null, primary key
#  fb_id                   :string           not null
#  edu_email_confirmed     :boolean          default(FALSE)
#  edu_email_confirm_token :string
#  fb_email                :string
#  edu_email               :string
#  university_id           :integer
#  marketing_opt_in        :boolean          default(TRUE), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  first_name              :string
#  last_name               :string
#  fb_picture              :string
#

FactoryGirl.define do
  factory :user do
    fb_id 123
    edu_email '123@berkeley.edu'
    university
  end
end
