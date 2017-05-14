# == Schema Information
#
# Table name: users
#
#  id                      :integer          not null, primary key
#  fb_id                   :string           not null
#  edu_email               :string
#  university_id           :integer
#  marketing_opt_in        :boolean          default("true"), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  fb_email                :string
#  edu_email_confirmed     :boolean          default("false")
#  edu_email_confirm_token :string
#

class User < ApplicationRecord
  validates :fb_id, :marketing_opt_in, presence: true
  validates :edu_email, uniqueness: true
  validates_uniqueness_of :fb_id, case_sensitive: false
  has_many :posts
  has_many :bookmarks
  has_many :bookmarked_posts, through: :bookmarks, source: :post
  has_many :rfps
  belongs_to :university, optional: true

  before_create :confirmation_token
  after_update :mail

  def email_activate
    self.edu_email_confirmed = true
    self.edu_email_confirm_token = nil
    save!(validate: false)
  end

  def mail
    UserMailer.registration_confirmation(self).deliver
  end
  #
  # TODO: testing delayed job
  # handle_asynchronously :mail,
  #                       run_at: Proc.new { 5.seconds.from_now }
  private

  def confirmation_token
    if self.edu_email_confirm_token.blank?
      self.edu_email_confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end
end
