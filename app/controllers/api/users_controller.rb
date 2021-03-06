module Api
  class UsersController < ApplicationController
    def friends
      @friends = current_user.friends
      render json: @friends
    end

    def search
      @users = (params[:keyword] != '') ? User.where('name LIKE(?)', "#{params[:keyword]}%").where.not(id: current_user.id) : []
      render json: @users
    end

    def current
      @current_user = current_user
      render json: @current_user
    end
  end
end
