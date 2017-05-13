class CreateRfps < ActiveRecord::Migration[5.0]
  def change
    create_table :rfps do |t|
      t.integer :user_id, null: false
      t.string :description, null: false
      t.timestamps
    end
    add_index :rfps, :user_id
  end
end
