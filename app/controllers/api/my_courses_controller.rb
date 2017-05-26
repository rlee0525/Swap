class Api::MyCoursesController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    @my_courses = user.courses
    render "api/my_courses/index", status: 200
  end

  def destroy
    user = fb_auth_user(params[:access_token])
    @my_courses = UsersCourse.where(user: user)
                  .where(course: Course.find(params[:id]))
    @my_courses.each(&:destroy)
    render json: ["successfully deleted"], status: 200
  end
end
