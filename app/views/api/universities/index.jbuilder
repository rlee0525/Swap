json.array! @universities do |university|
  json.extract! university,
                :id,
                :name,
                :email_extension
end
