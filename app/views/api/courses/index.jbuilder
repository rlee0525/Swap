# json.array! @courses do |course|
#   json.extract! course,
#                 :id,
#                 :university_id,
#                 :course_name,
#                 :course_number
# end

json.array! @courses do |course|
  json.set! :value, course.course_number
  json.set! :data, course.course_number
end
