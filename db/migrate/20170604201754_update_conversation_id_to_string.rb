class UpdateConversationIdToString < ActiveRecord::Migration[5.0]
  def change
    change_column :conversations, :conversation_id, :string, null: false
  end
end
