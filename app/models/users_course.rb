class UsersCourse < ApplicationRecord
  validates :user, :course, presence: true
  belongs_to :user
  belongs_to :course

  validates :user, uniqueness: { scope: :course }

end
