class CreateUniversities < ActiveRecord::Migration[5.0]
  def change
    create_table :universities do |t|
      t.string :name, null: false
      t.string :email_extension, null: false
      t.timestamps
    end
  end
end
