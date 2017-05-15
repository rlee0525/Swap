# == Schema Information
#
# Table name: rfps
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  description :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Rfp, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
