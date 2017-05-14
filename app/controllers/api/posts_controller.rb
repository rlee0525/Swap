class Api::PostsController < ApplicationController
  def index
    @posts = Post.all.includes(:course)
    render "api/posts/index", status: 200
  end

  def create
    @post = Post.new(post_params)
    course = Course.find_by(course_number: params[:course][:course])
    category = Category.find_by(name: params[:category][:category])
    @post.category = category

    # // TODO
    @post.user = User.first
    @post.zip_code = "99999"
    # // TODO

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

  def update
    @post = Post.find_by(id: params[:id])
    if @post.update(post_params)
      render "api/posts/show", status: 200
    else
      render json: ["internal error"], status: 500
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    if @post && @post.destroy
      render "api/posts/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :condition, :price, :description, :img_url1, :img_url2, :img_url3)
  end
end
