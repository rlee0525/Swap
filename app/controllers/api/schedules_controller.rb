class Api::SchedulesController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    if user
      @courses = user.courses
      render "api/schedules/index", status: 200
    else
      render json: ["Not found"], status: 404
    end
  end

  def create
    user = fb_auth_user(params[:access_token])
    @course = Course.find_by(course_number: params[:course])

    return render json: ["Not authorized"], status: 403 if !user
    return render json: ["Course not found"], status: 404 if !@course

    begin
      user.courses << course
    rescue
      return render json: ["Course already added"], status: 500
    end

    render "api/schedules/show"
  end

  def destroy
    user = fb_auth_user(params[:access_token])
    @course = Course.find_by(course_number: params[:course])

    return render json: ["Not authorized"], status: 403 if !user
    return render json: ["Course not found"], status: 404 if !@course

    if user.courses.delete(@course)
      render "api/schedules/show"
    else
      render json: ["User doesn't have this course"], status: 404
    end
  end
end
