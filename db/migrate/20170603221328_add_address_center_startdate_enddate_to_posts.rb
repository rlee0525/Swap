class AddAddressCenterStartdateEnddateToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :address, :string
    add_column :posts, :center, :string
    add_column :posts, :start_date, :datetime
    add_column :posts, :end_date, :datetime
  end
end
