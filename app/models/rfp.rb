# == Schema Information
#
# Table name: rfps
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  description :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Rfp < ApplicationRecord
  validates :user, :description, presence: true
  belongs_to :user
end
