class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def search
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
  end
end
