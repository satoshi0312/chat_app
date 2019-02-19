class AddFriendshipIdToMessage < ActiveRecord::Migration
  def change
    add_reference :messages, :friendship, foreign_key: true
    add_index :messages, :friendship_id
  end
end
