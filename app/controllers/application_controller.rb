class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  def fb_id(access_token)
    graph = Koala::Facebook::API.new(access_token)
    profile = graph.get_object("me")
    return profile["id"]
  rescue
    return nil
  end

  def fb_auth_user(access_token)
    user = nil
    begin
      graph = Koala::Facebook::API.new(access_token)
      profile = graph.get_object("me")
      fb_id = profile["id"]
      user = User.find_by(fb_id: fb_id)
    rescue
      return nil
    end

    if user && (user.fb_picture.nil? || user.first_name.nil? || user.last_name.nil?)
      first_name, last_name = profile["name"].split(" ")
      fb_picture = graph.get_picture(fb_id)
      user.update(
        fb_picture: fb_picture,
        first_name: first_name,
        last_name: last_name
      )
    end
    user
  end
end
