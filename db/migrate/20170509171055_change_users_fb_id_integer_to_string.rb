class ChangeUsersFbIdIntegerToString < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :fb_id, :string
  end
end
