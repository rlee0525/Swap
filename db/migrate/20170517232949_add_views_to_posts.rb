
class AddViewsToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :views, :integer, default: 1
  end
end
