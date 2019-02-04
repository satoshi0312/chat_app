class UsersController < ApplicationController
  def search
    @users = User.find
  end
end
