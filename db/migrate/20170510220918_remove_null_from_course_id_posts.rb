class RemoveNullFromCourseIdPosts < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :course_id, :integer, null: true
  end
end
