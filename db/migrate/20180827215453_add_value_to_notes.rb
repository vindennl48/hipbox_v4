class AddValueToNotes < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :value, :decimal
  end
end
