class Api::SearchController < ApplicationController
  def index
    query = params[:query]
    query = "" if query.nil?
    category = params[:category]
    category = nil if category == "All"
    sort_by = params[:sort_by]
    sort_by = "updated_at" if sort_by == "Posting Date"
    polarity = params[:polarity] == "1" ? 'ASC' : "DESC"
    polarity = 1 if polarity.nil?
    page_idx = params[:page_idx]
    page_idx = 1 if page_idx.nil?
    offset = 16 * (page_idx.to_i - 1)
    limit = 16
    sql_query = query.split(' ').map { |word| "%#{word}%" }
    sql = 'title ILIKE ANY( array[?] )'
    
    if (query.nil? || query.empty?) && (category.nil? || category.empty?)
      length = Post.where(active: true)
                   .where(deleted: false)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)

      @max_pages = (length / limit).ceil
    elsif (query.nil? || query.empty?)
      length = Post.where(active: true)
                   .where(deleted: false)
                   .where(category: category)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .where(category: category)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)

      @max_pages = (length / limit).ceil
    elsif (category.nil? || category.empty?)
      length = Post.where(active: true)
                   .where(deleted: false)
                   .where(sql, sql_query)
                   .count

      @posts = Post.where(active: true)
                   .where(deleted: false)
                   .order("#{sort_by} #{polarity}")
                   .offset(offset)
                   .limit(limit)
                   .where(sql, sql_query)

      @max_pages = (length / limit).ceil
    else
      length = Post.where(active: true)
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

      @max_pages = (length / limit).ceil
    end

    @max_pages = 2
    render 'api/search/index'
  end

  private

  # TODO if not useful delete in future releases
  # def calc_score(post, query)
  #   categories = ['Textbooks', 'Clothing', 'Furniture', 'Electronics',
  #                 'Lost & Found', 'Games', 'Bikes', 'Housing']
  #
  #   query = query.split(' ')
  #   score = 0
  #   max = 0
  #
  #   query.each do |word|
  #     max += word.length
  #     if post['title'].downcase.include? word.downcase
  #       score += word.length
  #     elsif categories[post['category_id'] + 1] == word.capitalize
  #       score += 10
  #     end
  #   end
  #
  #   score
  # end

  # TODO if not useful delete in future releases
  # def match(str1, str2)
  #   matrix = Array.new(str1.length + 1) { Array.new(str2.length + 1, nil) }
  #   matrix[0] = (0..str1.length + 1).to_a
  #
  #   matrix.each_with_index do |row, r_idx|
  #     next if r_idx.zero?
  #
  #     row.each_with_index do |_el, c_idx|
  #       if c_idx.zero?
  #         matrix[r_idx][c_idx] = matrix[r_idx - 1][c_idx] + 1
  #         next
  #       end
  #       up = matrix[r_idx - 1][c_idx]
  #       left = matrix[r_idx][c_idx - 1]
  #       dia = matrix[r_idx - 1][c_idx - 1]
  #
  #       min = [up, left, dia].min
  #
  #       if str1[r_idx - 1].casecmp(str2[c_idx - 1].downcase).zero?
  #         matrix[r_idx][c_idx] = min
  #       else
  #         matrix[r_idx][c_idx] = min + 1
  #       end
  #
  #     end
  #   end
  #   str1.length - matrix.last.last
  # end
end
