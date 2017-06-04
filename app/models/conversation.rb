# == Schema Information
#
# Table name: conversations
#
#  id              :integer          not null, primary key
#  conversation_id :string           not null
#  user_id         :string           not null
#  archived        :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Conversation < ApplicationRecord
  validates :conversation_id, presence: true
  validates :user_id, presence: true
  validates :archived, inclusion: { in: [true, false] }

  belongs_to :user, foreign_key: :user_id, class_name: :User, primary_key: :fb_id
end
