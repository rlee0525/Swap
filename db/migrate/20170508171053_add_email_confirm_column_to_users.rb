class AddEmailConfirmColumnToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :edu_email_confirmed, :boolean, :default => false
    add_column :users, :edu_email_confirm_token, :string
  end
end
