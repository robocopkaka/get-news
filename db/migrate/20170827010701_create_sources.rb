class CreateSources < ActiveRecord::Migration[5.1]
  def change
    create_table :sources do |t|
      t.string :name
      t.string :logo
      t.string :shortcode

      t.timestamps
    end
  end
end
