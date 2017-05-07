class AddIndices < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :fb_id
    add_index :users, :edu_email
    add_index :users, :university_id
    add_index :posts, :user_id
    add_index :posts, :course_id
    add_index :courses, :university_id
  end
end
