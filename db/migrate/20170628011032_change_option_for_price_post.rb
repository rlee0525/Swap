class ChangeOptionForPricePost < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :price, :integer, null: true
  end
end
