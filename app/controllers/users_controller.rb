class UsersController < ApplicationController
  before_action :authenticate_user!

  def interface
    @user = current_user.email.sub(/@.+$/, '').capitalize
    @layout_name = "default"
  end

end
