class RemoveGuiFromLayouts < ActiveRecord::Migration[5.2]
  def change
    remove_column :layouts, :gui, :json
  end
end
