json.array! @my_courses do |course|
  json.extract! course,
                :id,
                :course_name,
                :course_number
end
