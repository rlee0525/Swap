# == Schema Information
#
# Table name: configurations
#
#  id         :integer          not null, primary key
#  app        :string           not null
#  variables  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :configuration do
    app "MyString"
    variables "MyString"
  end
end
