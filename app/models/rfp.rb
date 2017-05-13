class Rfp < ApplicationRecord
  validates :user, :description, presence: true
  belongs_to :user
end
