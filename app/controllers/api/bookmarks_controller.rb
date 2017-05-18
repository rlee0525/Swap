class Api::BookmarksController < ApplicationController
  def create
    @bookmarked_post = Bookmark.new(bookmark_params)
    if @bookmarked_post.save
      render "api/bookmarks/show", status: 200
    else
      render json: ["invalid parameters"], status: 500
    end
  end

  def index
    # TODO add authentication in application_controller
    # for selecting user. right now uses first user
    @bookmarked_posts = User.first.bookmarked_posts.order(id: :desc)
    render "api/bookmarks/index", status: 200
  end

  def destroy
    @bookmarks = Bookmark.where(user: User.first).where(post: Post.find(params[:id]))
    @bookmarks.each { |bookmark| bookmark.destroy }
    render json: ["successfully deleted"], status: 200
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:user_id, :post_id)
  end
end
