json.array! @rfps do |rfp|
  json.extract! rfp,
                :id,
                :user_id,
                :description
end
