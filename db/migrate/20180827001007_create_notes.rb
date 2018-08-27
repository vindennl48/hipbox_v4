class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :variable
      t.string :osc

      t.timestamps
    end
  end
end
