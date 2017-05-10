class Api::SearchController < ApplicationController
  def index 
    @posts = Post.all
    render 'api/search/index'
  end
end
