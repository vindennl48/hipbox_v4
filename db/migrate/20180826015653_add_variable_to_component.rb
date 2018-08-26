class AddVariableToComponent < ActiveRecord::Migration[5.2]
  def change
    add_column :components, :variable, :string
  end
end
