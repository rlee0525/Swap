class Api::CoursePostsController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    if user
      @course_posts = user.course_posts
      render "api/my_courses/show", status: 200
    else
      render json: ["unauthorized"], status: 403
    end
  end
end
