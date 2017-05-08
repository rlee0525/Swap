require 'HTTParty'
require 'Nokogiri'
require 'JSON'
require 'Pry'
require 'CSV'
require_relative "links"

data = []

Links.links.each do |link|
  page = HTTParty.get(link)

  parse_page = Nokogiri::HTML(page)

  parse_page.css('.courseblocktitle').map do |course|
    parsed_course = {
      course_number: course.css('.code').text,
      course_title: course.css('.title').text
    }
    data.push(parsed_course)
  end
end

Pry.start(binding)

CSV.open("data.csv", "wb") do |csv|
  csv << data.first.keys
  data.each do |hash|
    csv << hash.values
  end
end
