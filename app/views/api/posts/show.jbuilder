json.extract! @post,
              :id,
              :title,
              :user_id,
              :description,
              :price,
              :img_url1,
              :img_url2,
              :img_url3,
              :category_id,
              :course_id,
              :zip_code,
              :created_at,
              :views,
              :active,
              :bookmarks
json.course @post.course.course_number if @post.course
json.category @post.category.name
json.fb_id @post.user.fb_id
json.is_bookmarked @post.user.bookmarked_posts.where(active: true).include?(@post)
json.is_owner @post.user == @user
