class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

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
end
