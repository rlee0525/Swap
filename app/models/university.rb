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

class University < ApplicationRecord
  validates :name, :email_extension, presence: true
  has_many :courses
  has_many :users
end
