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

class Conversation < ApplicationRecord
  validates :conversation_id, presence: true, numericality: { only_integer: true }
  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :archived, inclusion: { in: [true, false] }

  belongs_to :user
end
