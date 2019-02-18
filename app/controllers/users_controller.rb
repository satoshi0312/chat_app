class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @user.avatar = @user.avatar != '' ? @user.avatar : 'default_image.jpg'
  end
end
