class AddNullFalseToConditionToPosts < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :condition, :string, :null => false
  end
end
