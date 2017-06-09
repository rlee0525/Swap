class UpdateConfigTableName < ActiveRecord::Migration[5.0]
  def change
    rename_table :configurations, :app_keys
  end
end
