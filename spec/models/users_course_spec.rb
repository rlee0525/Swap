# == Schema Information
#
# Table name: users_courses
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe UsersCourse, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
