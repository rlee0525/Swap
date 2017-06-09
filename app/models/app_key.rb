# == Schema Information
#
# Table name: app_keys
#
#  id         :integer          not null, primary key
#  app        :string           not null
#  variables  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class AppKey < ApplicationRecord
  validates :app, presence: true, uniqueness: true
  validates :variables, presence: true
end
