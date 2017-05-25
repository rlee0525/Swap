json.posts do
  json.array! @posts
end

json.max_pages @max_pages
json.result_count @result_count
