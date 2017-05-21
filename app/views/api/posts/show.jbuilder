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
              :condition,
              :views,
              :active
json.course @post.course.course_number if @post.course
json.category @post.category.name
json.fb_id @post.user.fb_id
