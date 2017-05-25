json.array! @courses do |course|
  json.set! :value, course.course_number
  json.set! :data, course.course_number
end
