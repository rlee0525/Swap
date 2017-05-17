class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :fb_id, null: false
      t.boolean :edu_email_confirmed, default: false
      t.string :edu_email_confirm_token
      t.string :fb_email
      t.string :edu_email
      t.integer :university_id
      t.boolean :marketing_opt_in, null: false, default: true
      t.timestamps
    end
    add_index :users, :fb_id
  end
end
