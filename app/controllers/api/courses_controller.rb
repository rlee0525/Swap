class Api::CoursesController < ApplicationController
  def index
    @courses = Course.all
    render json: @courses, status: 200
  end

  def show
    @course = Course.find_by(id: params[:id])
    if @course
      render json: @course, status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
