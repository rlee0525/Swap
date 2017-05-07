class AddUniquessToFbIdFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_index :users, :fb_id
    add_index :users, :fb_id, unique: true
  end
end
