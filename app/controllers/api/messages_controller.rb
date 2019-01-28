module Api
  class MessagesController < ApplicationController
    def index
      @messages = Message.all
      # binding.pry
      render json: @messages
    end

    def create
      # binding.pry
      @message = Message.create(message_params)
      render json: @message
    end

    private
      def message_params
        params.require(:message).permit(:text, :user_id)
      end
  end
end
