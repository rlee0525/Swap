class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :fb_app_id, :localhost_url

  def fb_id(access_token)
    graph = Koala::Facebook::API.new(access_token)
    profile = graph.get_object("me")
    return profile["id"]
  rescue
    return nil
  end

  def fb_authenticated(access_token)
    begin
      graph = Koala::Facebook::API.new(access_token)
      profile = graph.get_object("me")
      fb_id = profile["id"]
      user = User.find_by(fb_id: fb_id)
    rescue
      return false
    end
    !!user
  end

  def fb_app_id
    ENV["FB_APP_ID"]
  end

  def localhost_url
    if Rails.env.development?
      return 'localhost:3000'
    elsif Rails.env.production?
      return "http://www.swapnow.io"
    end
  end
end
