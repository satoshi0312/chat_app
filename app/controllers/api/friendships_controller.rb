module Api
  class FriendshipsController < ApplicationController
    def show
      friend_user_id = params[:id].to_i
      current_user_friendships = Friendship.where('from_user_id = ? or to_user_id = ?',current_user.id,current_user.id)
      friendship = current_user_friendships.where('from_user_id = ? or to_user_id = ?',friend_user_id,friend_user_id).first
      friend_messages = friendship.messages
      render json: friend_messages
    end
  end
end
