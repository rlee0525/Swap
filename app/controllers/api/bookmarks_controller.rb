class Api::BookmarksController < ApplicationController
  def create
    user = fb_auth_user(params[:access_token])
    return render json: ["unauthorized"], status: 401 if user.nil?

    @bookmarked_post = Bookmark.new(bookmark_params)
    @bookmarked_post.user = user

    if @bookmarked_post.save
      render "api/bookmarks/show", status: 200
    else
      render json: ["invalid parameters"], status: 500
    end
  end

  def index
    user = fb_auth_user(params[:access_token])
    @bookmarked_posts = user.bookmarked_posts.order(id: :desc)
    render "api/bookmarks/index", status: 200
  end

  def destroy
    user = fb_auth_user(params[:access_token])
    @bookmarks = Bookmark.where(user: user).where(post: Post.find(params[:id]))
    @bookmarks.each(&:destroy)
    render json: ["successfully deleted"], status: 200
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:post_id)
  end
end
