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
#

require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "validations" do
    it { should validate_presence_of(:user) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:price) }
    it { should validate_presence_of(:img_url1) }
  end

  describe "associations" do
    it { should belong_to(:course) }
    it { should belong_to(:user) }
  end
end
