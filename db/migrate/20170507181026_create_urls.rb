class CreateUrls < ActiveRecord::Migration[5.0]
  def change
    create_table :urls do |t|
      t.string :urlstr
      t.string :tinyurlstr

      t.timestamps
    end
  end
end
