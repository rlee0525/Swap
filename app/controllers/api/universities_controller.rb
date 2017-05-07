class Api::UniversitiesController < ApplicationController
  def index
    @universities = University.all
    render json: @universities, status: 200
  end

  def show
    @university = University.find_by(id: params[:id])
    if @university
      render json: @university, status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
