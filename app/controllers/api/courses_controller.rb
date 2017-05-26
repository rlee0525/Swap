class Api::CoursesController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    if user
      @coures = Course.all
      return render "api/courses/index", status: 200
    end

    filter = params[:search]
    if filter
      @courses = Course.search(filter).limit(10)
    else
      @courses = Course.all
    end
    render "api/courses/index", status: 200
  end

  def show
    @course = Course.find_by(id: params[:id])
    if @course
      render "api/courses/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def destroy

  end
end
