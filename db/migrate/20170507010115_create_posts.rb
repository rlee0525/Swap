class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :category, null: false
      t.integer :price, null: false
      t.string :img_url1, null: false
      t.string :img_url2
      t.string :img_url3
      t.integer :course_id
      t.integer :views, default: 1
      t.boolean :active, default: true
      t.boolean :deleted, default: false
      t.timestamps
    end
    add_index :posts, :user_id
    add_index :posts, :course_id
    add_index :posts, :category
  end
end
