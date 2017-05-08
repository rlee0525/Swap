json.array! @courses do |course|
  json.extract! course,
                :id,
                :university_id,
                :course_name,
                :course_number
end
