class CreateComponents < ActiveRecord::Migration[5.2]
  def change
    create_table :components do |t|
      t.string :ctype
      t.decimal :x
      t.decimal :y
      t.decimal :width
      t.decimal :height
      t.string :color
      t.json :extra
      t.references :layout, foreign_key: true

      t.timestamps
    end
  end
end
