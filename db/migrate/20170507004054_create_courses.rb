class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.integer :university_id, null: false
      t.string :course_name, null: false
      t.string :course_number, null: false
      t.timestamps
    end
    add_index :courses, :university_id
  end
end
