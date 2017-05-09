class RemoveNullFalseFromUniversityIdFromUsers < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :university_id, :integer, null: true
  end
end
