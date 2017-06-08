class Api::SearchController < ApplicationController
  def index
    query = params[:query]
    query = "" if query.nil?
    category = params[:category]
    category = nil if category == "All"
    sort_by = params[:sort_by]
    sort_by = "updated_at" if sort_by == "Posting Date"
    polarity = params[:polarity] == "1" ? 'ASC' : "DESC"
    page_idx = params[:page_idx]
    page_idx = 1 if page_idx.nil?
    offset = 16 * (page_idx.to_i - 1)
    limit = 16
    sql_query = query.split(' ').map { |word| "%#{word}%" }
    sql = 'title ILIKE ANY( array[?] )'

    if (query.nil? || query.empty?) && category == "My Course Material"
      user = fb_auth_user(params[:access_token])
      @result_count = user.course_posts.where(active: true)
                   .where(deleted: false)
                   .count

      @posts = user.course_posts.where(active: true)
                  .where(deleted: false)
                  .order("#{sort_by} #{polarity}")
                  .offset(offset)
                  .limit(limit)
                  .includes(:user)

      @max_pages = (@result_count / limit.to_f).ceil
    elsif category == "My Course Material"
      user = fb_auth_user(params[:access_token])
      @result_count = user.course_posts.where(active: true)
                   .where(deleted: false)
                   .where(sql, sql_query)
                   .count

      @posts = user.course_posts.where(active: true)
                  .where(deleted: false)
                  .order("#{sort_by} #{polarity}")
                  .offset(offset)
                  .limit(limit)
                  .where(sql, sql_query)
                  .includes(:user)

      @max_pages = (@result_count / limit.to_f).ceil
    elsif (query.nil? || query.empty?) && (category.nil? || category.empty?)
      @result_count = Post.where(active: true)
                   .where(deleted: false)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)
                   .includes(:user)

      @max_pages = (@result_count / limit.to_f).ceil
    elsif (query.nil? || query.empty?)
      @result_count = Post.where(active: true)
                   .where(deleted: false)
                   .where(category: category)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .where(category: category)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)
                   .includes(:user)

      @max_pages = (@result_count / limit.to_f.to_f).ceil
    elsif (category.nil? || category.empty?)
      @result_count = Post.where(active: true)
                   .where(deleted: false)
                   .where(sql, sql_query)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)
                   .where(sql, sql_query)
                   .includes(:user)

      @max_pages = (@result_count / limit.to_f).ceil
    else
      @result_count = Post.where(active: true)
                   .where(deleted: false)
                   .where(category: category)
                   .where(sql, sql_query)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .where(category: category)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)
                   .where(sql, sql_query)
                   .includes(:user)

      @max_pages = (@result_count / limit.to_f).ceil
    end

    render 'api/search/index'
  end
end
