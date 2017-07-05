class ChangeBookmarkPostIdUuid < ActiveRecord::Migration[5.0]
  def change
    execute "ALTER TABLE bookmarks ALTER post_id TYPE uuid USING post_id::uuid;"
  end
end
