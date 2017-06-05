class ChangeConversationUserIdToString < ActiveRecord::Migration[5.0]
  def change
    change_column :conversations, :user_id, :string, null: false
  end
end
