class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.string :idea
      t.string :image

      t.timestamps null: false
    end
  end
end
