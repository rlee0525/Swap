class RemoveRegEmailFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :reg_email
  end
end
