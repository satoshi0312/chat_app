class AddImageToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :image, :text
  end
end
