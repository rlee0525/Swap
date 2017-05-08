class Api::UniversitiesController < ApplicationController
  def index
    @universities = University.all
    render "api/universities/index", status: 200
  end

  def show
    @university = University.find_by(id: params[:id])
    if @university
      render "api/universities/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
