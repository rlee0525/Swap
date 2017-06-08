class CreateConfigurations < ActiveRecord::Migration[5.0]
  def change
    create_table :configurations do |t|
      t.string :app, null: false, unique: true
      t.string :variables, null: false

      t.timestamps
    end

    add_index :configurations, :app, unique: true
  end
end
