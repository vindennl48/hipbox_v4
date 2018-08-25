class AddNameToLayout < ActiveRecord::Migration[5.2]
  def change
    add_column :layouts, :name, :string
  end
end
