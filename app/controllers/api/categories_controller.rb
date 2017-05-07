class Api::CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render json: @categories, status: 200
  end

  def show
    @category = Category.find_by(id: params[:id])
    if @category
      render json: @category, status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
