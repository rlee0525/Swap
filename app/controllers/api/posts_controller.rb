class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    render json: @posts, status: 200
  end

  def create; end

  def show
    @post = Post.find_by(id: params[:id])
    if @post
      render json: @post, status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def update; end
end
