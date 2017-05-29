json.posts do
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
                  :views,
                  :active
    json.seller_name "#{post.user.first_name} #{post.user.last_name[0]}."
    json.seller_fb_picture post.user.fb_picture
  end
end

json.max_pages @max_pages
json.result_count @result_count
