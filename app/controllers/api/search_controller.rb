class Api::SearchController < ApplicationController
  def index
    # category = params[:query].capitalize
    # @posts = Post.joins(:category).where('categories.name = ?', category)


    query = params[:query].split(' ').map { |word| "%#{word}%" }

    sql = 'title ILIKE ANY( array[?] ) OR categories.name ILIKE ANY ( array[?] )'

    @posts = Post.joins(:category).where(sql, query, query)

    render 'api/search/index'
  end
end
