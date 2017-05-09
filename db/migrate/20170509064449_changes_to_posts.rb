class ChangesToPosts < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :img_url2, :string, :null => true
    add_column :posts, :img_url3, :string
    add_column :posts, :condition, :string
  end
end
