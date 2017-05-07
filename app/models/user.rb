# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  fb_id            :integer          not null
#  edu_email        :string           not null
#  university_id    :integer          not null
#  marketing_opt_in :boolean          default("true"), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class User < ApplicationRecord
  validates :fb_id, :edu_email, :university, :marketing_opt_in, presence: true
  validates :fb_id, uniqueness: true
  has_many :posts
  belongs_to :university
end
