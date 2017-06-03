class Api::PostsController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    @posts = user.posts.includes(:course).order(id: :desc).where(deleted: false)
    render "api/posts/index", status: 200
  end

  def create
    user = fb_auth_user(params[:access_token])
    @post = Post.new(post_params)
    course = Course.find_by(course_number: params[:course][:course])
    @post.user = user

    if @post.save
      @post.update(course: course) if course
      render "api/posts/show", status: 200
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
    @user = fb_auth_user(params[:access_token])
    # return render json: ["unauthorized"], status: 401 unless @user
    @post = Post.find_by(id: params[:id])
    if @post && !@post.deleted && @post.active
      @post.update_columns(views: @post.views + 1)
      render "api/posts/show", status: 200
    elsif @post && !@post.deleted && params[:edit]
      render "api/posts/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def update
    user = fb_auth_user(params[:access_token])
    @post = Post.find_by(id: params[:id])
    if params[:method] == "delete" && @post.update(deleted: true)
      return render "api/posts/show", status: 200
    elsif params[:method] == "delete"
      return render json: ["not found"], status: 404
    end

    if params[:method] == "activate" && @post.update(active: true)
      return render "api/posts/show", status: 200
    end

    if params[:method] == "deactivate" && @post.update(active: false)
      return render "api/posts/show", status: 200
    end

    course_number = params[:course][:course]

    course = Course.find_by(course_number: course_number)
    update_params = post_params.merge(course: course)

    if @post && @post.user == user && @post.update(update_params)
      render "api/posts/show", status: 200
    else
      render json: ["internal error"], status: 500
    end
  end

  private

  def post_params
    params.require(:post)
          .permit(:title, :price, :description, :category, :img_url1, :img_url2, 
                  :img_url3, :address, :center, :start_date, :end_date)
  end
end
