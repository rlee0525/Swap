class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.integer :fb_id, null: false
      t.string :edu_email, null: false
      t.integer :university_id, null: false
      t.boolean :marketing_opt_in, null: false, default: true
      t.timestamps
    end
    add_index :users, [:fb_id, :university_id]
  end
end
