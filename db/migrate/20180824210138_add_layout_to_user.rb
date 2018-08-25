class AddLayoutToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :layout, :integer
  end
end
