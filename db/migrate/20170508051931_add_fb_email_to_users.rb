class AddFbEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :fb_email, :string
  end
end
