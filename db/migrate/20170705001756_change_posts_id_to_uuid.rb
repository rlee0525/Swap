class ChangePostsIdToUuid < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :uuid, :uuid, default: "uuid_generate_v4()", null: false, unique: true

    change_table :posts do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE posts ADD PRIMARY KEY (id);"
  end
end
