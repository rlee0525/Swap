class ChangeBookmarkPostTypeString < ActiveRecord::Migration[5.0]
  def change
    change_column :bookmarks, :post_id, :string
  end
end
