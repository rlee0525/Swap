# == Schema Information
#
# Table name: configurations
#
#  id         :integer          not null, primary key
#  app        :string           not null
#  variables  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Configuration, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
