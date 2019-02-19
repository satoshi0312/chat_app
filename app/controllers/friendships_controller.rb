class FriendshipsController < ApplicationController
  def create
    friendship = Friendship.create(friendship_params)
    redirect_to root_path
  rescue => e
    redirect_to root_path
  end

  def destroy
    friend_user_id = params[:id].to_i
    current_user_friendships = Friendship.where('from_user_id = ? or to_user_id = ?',current_user.id,current_user.id)
    delete_friendship = current_user_friendships.where('from_user_id = ? or to_user_id = ?',friend_user_id,friend_user_id).first
    delete_friendship.destroy
    redirect_to root_path
  end

  private
      def friendship_params
      params.permit(:to_user_id).merge(from_user_id: current_user.id)
    end
end
