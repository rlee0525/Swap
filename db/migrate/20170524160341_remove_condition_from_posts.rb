class RemoveConditionFromPosts < ActiveRecord::Migration[5.0]
  def change
    remove_column :posts, :condition
  end
end
