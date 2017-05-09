require 'koala'

class Api::CategoriesController < ApplicationController
  def index
    if fb_authenticated(params[:access_token])
      @categories = Category.all
      render "api/categories/index", status: 200
    else
      render json: ["not authorized"], status: 401
    end
  end

  def show
    @category = Category.find_by(id: params[:id])
    if @category
      render "api/categories/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
