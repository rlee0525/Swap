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

require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    let (:university) { create(:university) }
    let! (:user) { create(:user) }
    it { should validate_presence_of(:fb_id) }
    it { should validate_presence_of(:edu_email) }
    it { should validate_presence_of(:marketing_opt_in) }
    it { should validate_uniqueness_of(:fb_id) }
    it { should validate_uniqueness_of(:edu_email) }
  end

  describe "associations" do
    it { should have_many(:posts) }
    it { should belong_to(:university) }
  end
end
