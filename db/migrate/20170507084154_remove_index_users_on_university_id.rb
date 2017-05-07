class RemoveIndexUsersOnUniversityId < ActiveRecord::Migration[5.0]
  def change
    remove_index(:users, :name => 'index_users_on_fb_id')
    remove_index(:users, :name => 'index_users_on_university_id')
    remove_index(:posts, :name => 'index_posts_on_user_id_and_category_id_and_course_id')
    remove_index(:courses, :name => 'index_courses_on_university_id')
  end
end
