json.array! @course_posts do |post|
  json.extract! post,
                :id,
                :title,
                :user_id,
                :title,
                :description,
                :price,
                :img_url1,
                :img_url2,
                :img_url3,
                :category,
                :course_id,
                :updated_at,
                :active
  json.course post.course.course_number
end
