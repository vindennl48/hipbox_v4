class CreateLayouts < ActiveRecord::Migration[5.2]
  def change
    create_table :layouts do |t|
      t.references :user, foreign_key: true
      t.json :gui

      t.timestamps
    end
  end
end
