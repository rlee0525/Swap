class CreateConversations < ActiveRecord::Migration[5.0]
  def change
    create_table :conversations do |t|
      t.integer :conversation_id, null: false
      t.integer :user_id, null: false
      t.boolean :archived, default: false

      t.timestamps
    end
  end
end
