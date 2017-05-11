class Api::SearchController < ApplicationController
  def index
    category = params[:query].capitalize
    @posts = Post.joins(:category).where('categories.name = ?', category)
    render 'api/search/index'
  end
end
