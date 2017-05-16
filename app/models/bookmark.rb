# == Schema Information
#
# Table name: bookmarks
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bookmark < ApplicationRecord
  validates :user, :post, presence: true
  validates_uniqueness_of :user_id, :scope => :post_id

  belongs_to :user
  belongs_to :post
end
