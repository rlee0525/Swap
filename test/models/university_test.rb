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

require 'test_helper'

class UniversityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
