class RemoveZipcodeFromPosts < ActiveRecord::Migration[5.0]
  def change
    remove_column :posts, :zip_code
  end
end
