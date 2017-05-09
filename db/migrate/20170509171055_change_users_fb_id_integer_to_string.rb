class ChangeUsersFbIdIntegerToString < ActiveRecord::Migration[5.0]
  def change
    remove_colum :users, :fb_id
    add_column :users, :fb_id, :string, null: false
  end
end
