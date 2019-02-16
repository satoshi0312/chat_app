module Api
  class MessagesController < ApplicationController
    def index
      messages = Message.all
      # binding.pry
      render json: messages
    end

    def create
      # binding.pry
      message = Message.create(message_params)
      render json: message
    end

    def show
      friend_user_id = params[:id].to_i
      current_user_friendships = Friendship.where('from_user_id = ? or to_user_id = ?',current_user.id,current_user.id)
      friendship = current_user_friendships.where('from_user_id = ? or to_user_id = ?',friend_user_id,friend_user_id).first
      friend_messages = friendship.messages
      render json: friend_messages
    end

    private
      def message_params
        params.require(:message).permit(:text, :user_id)
      end
  end
end
