class Api::CoursesController < ApplicationController
  def index
    @courses = Course.all
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
end
