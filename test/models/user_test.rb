# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  fb_id            :integer          not null
#  edu_email        :string
#  university_id    :integer          not null
#  marketing_opt_in :boolean          default("true"), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  fb_email         :string
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
