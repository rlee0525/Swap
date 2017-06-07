json.array! @posts do |post|
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
                :active,
                :views,
                :address,
                :lat,
                :lng,
                :start_date,
                :end_date
  json.course post.course.course_number if post.course
end
