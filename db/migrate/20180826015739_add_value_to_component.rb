class AddValueToComponent < ActiveRecord::Migration[5.2]
  def change
    add_column :components, :value, :decimal
  end
end
