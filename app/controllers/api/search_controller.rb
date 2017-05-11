class Api::SearchController < ApplicationController
  def index
    # category = params[:query].capitalize
    # @posts = Post.joins(:category).where('categories.name = ?', category)
    query = params[:query]

    sql_query = query.split(' ').map { |word| "%#{word}%" }

    sql = 'title ILIKE ANY( array[?] ) OR categories.name ILIKE ANY ( array[?] )'

    @posts = Post.joins(:category).where(sql, sql_query, sql_query)

    

    render 'api/search/index'
  end

  private 

  def match(str1, str2)
    matrix = Array.new(str1.length + 1) { Array.new(str2.length + 1, nil) }
    matrix[0] = (0..str1.length + 1).to_a
    
    matrix.each_with_index do |row, r_idx|
      next if r_idx.zero?
      
      row.each_with_index do |el, c_idx|
        if c_idx.zero?
          matrix[r_idx][c_idx] = matrix[r_idx - 1][c_idx] + 1
          next
        end
        up = matrix[r_idx - 1][c_idx]
        left = matrix[r_idx][c_idx - 1]
        dia = matrix[r_idx - 1][c_idx - 1]
        
        min = [up, left, dia].min
        
        if str1[r_idx - 1].downcase == str2[c_idx - 1].downcase
          matrix[r_idx][c_idx] = min
        else
          matrix[r_idx][c_idx] = min + 1
        end
    
      end
    end
    
    str1.length - matrix.last.last
  end
end
