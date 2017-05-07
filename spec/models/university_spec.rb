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

require 'rails_helper'

RSpec.describe University, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email_extension) }
  end

  describe "associations" do
    it { should have_many(:courses) }
    it { should have_many(:users) }
  end
end
