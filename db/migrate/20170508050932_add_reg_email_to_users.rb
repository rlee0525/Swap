class AddRegEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :reg_email, :string
  end
end
