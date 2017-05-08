json.array! @posts do |post|
  json.extract! post,
                :id,
                :user_id,
                :description,
                :price,
                :img_url1,
                :img_url2,
                :category_id,
                :course_id,
                :zip_code
end
