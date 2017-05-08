class RemoveNullFalseToEduEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :edu_email, :string, :null => true
  end
end
