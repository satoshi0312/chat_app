class FriendshipsController < ApplicationController
  def create
      # binding.pry
      friendship = Friendship.create(friendship_params)
      redirect_to root_path
  end

  private
    def friendship_params
      # binding.pry
      params.require(:friendship).permit(:to_user_id).merge(from_user_id: current_user.id)
    end
end
