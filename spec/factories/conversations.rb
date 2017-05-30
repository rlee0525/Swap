# == Schema Information
#
# Table name: conversations
#
#  id              :integer          not null, primary key
#  conversation_id :integer          not null
#  user_id         :integer          not null
#  archived        :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

FactoryGirl.define do
  factory :conversation do
    conversation_id 1
    user_id 1
    archived false
  end
end
