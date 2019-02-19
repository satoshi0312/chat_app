class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.references :from_user, foreign_key: {to_table: :users}
      t.references :to_user, foreign_key: {to_table: :users}
      t.timestamps null: false
    end
    add_index :friendships, [:from_user_id, :to_user_id], unique: true
  end
end
