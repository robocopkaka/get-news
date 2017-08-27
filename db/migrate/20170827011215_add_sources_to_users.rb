class AddSourcesToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :sources, :text, array: true, default: []
  end
end
