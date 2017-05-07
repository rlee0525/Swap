class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.text :description, null: false
      t.integer :price, null: false
      t.string :img_url1, null: false
      t.string :img_url2, null: false
      t.integer :category_id, null: false
      t.integer :course_id, null: false
      t.string :zip_code
      t.timestamps
    end
    add_index :posts, :user_id, :category_id, :course_id
  end
end
