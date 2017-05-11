class Api::BookmarksController < ApplicationController
  def create
    @bookmarked_post = Bookmark.new(bookmark_params)
    if @bookmarked_post.save
      render "api/bookmarks/show", status: 200
    else
      render "invalid parameters", status: 500
    end
  end

  def index
    # TODO add authentication in application_controller
    # for selecting user. right now uses first user
    @bookmarked_posts = User.first.bookmarked_posts
    render "api/bookmarks/index", status: 200
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:user_id, :post_id)
  end
end
