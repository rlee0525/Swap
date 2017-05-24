json.array! @bookmarked_posts do |bookmarked_post|
  json.extract! bookmarked_post,
                :id,
                :title,
                :user_id,
                :description,
                :price,
                :img_url1,
                :img_url2,
                :img_url3,
                :category,
                :course_id,
                :created_at,
                :active
end
