module Api
  class FriendshipsController < ApplicationController
    def create
      friendship = Friendship.create(friendship_params)
      # binding.pry
      redirect_to '/'
    end

    def destroy
      friend_user_id = params[:friend_user_id]
      current_user_friendships = Friendship.where('from_user_id = ? or to_user_id = ?',current_user.id,current_user.id)
      delete_friendship = current_user_friendships.where('from_user_id = ? or to_user_id = ?',friend_user_id,friend_user_id).first
      delete_friendship.destroy
    end

    private
      def friendship_params
        # binding.pry
        params.require(:friendship).permit(:to_user_id).merge(from_user_id: current_user.id)
      end
  end
end
