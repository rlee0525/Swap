# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text             not null
#  category    :string           not null
#  price       :integer          not null
#  img_url1    :string           not null
#  img_url2    :string
#  img_url3    :string
#  course_id   :integer
#  views       :integer          default(1)
#  active      :boolean          default(TRUE)
#  deleted     :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  address     :string
#  lat         :float
#  lng         :float
#  start_date  :datetime
#  end_date    :datetime
#

class Post < ApplicationRecord
  validates :user, :description,
            :price, :img_url1,
            :title, :category,
            presence: true

  validates_presence_of :address, :lat, :lng, :start_date, :end_date, :if => Proc.new { |post| post.category == 'Housing' }

  has_many :bookmarks
  belongs_to :course, inverse_of: :posts, optional: true
  belongs_to :user

  after_create :check_rfps

  def check_rfps
    Rfp.all.each do |rfp|
      check_relevance(rfp.description, rfp.user)
    end
  end

  def check_relevance(description, user)
    post = self.as_json
    relevance_score = calc_score(post, description)
    if relevance_score >= 10
      UserMailer.rfp_alert(user, post, description).deliver
    end
  end

  private

  def calc_score(post, query)
    query = query.split(' ')
    score = 0
    max = 0

    query.each do |word|
      max += word.length
      if post['title'].downcase.include? word.downcase
        score += word.length
      end
    end

    score
  end

end
