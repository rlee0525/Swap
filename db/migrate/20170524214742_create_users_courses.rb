class CreateUsersCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :users_courses do |t|
      t.integer :user_id, null: false
      t.integer :course_id, null: false
      t.timestamps
    end
    add_index :users_courses, :user_id
    add_index :users_courses, :course_id
  end
end
