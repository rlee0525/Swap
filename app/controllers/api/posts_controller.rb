class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    render "api/posts/index", status: 200
  end

  def create
    @post = Post.new(params[:post])
    course = Course.find_by(course_number: params[:post][:course])
    if @post.save
      if course
        @post.update(course: course)
      end
      render "api/posts/show", status: 200
    else
      render json: ["not found"], status: 500
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    if @post
      render "api/posts/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def update; end
end
