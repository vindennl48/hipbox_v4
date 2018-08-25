class UsersController < ApplicationController
  before_action :authenticate_user!

  def interface
    @user = User.find(current_user.id)
    @user_name = User.user_name(@user)
    @layout = Layout.get_current_layout(@user)
    @layouts = Layout.where(user_id: @user.id)
  end

  def new_layout
    Layout.create_new_layout(current_user, params[:name])
    redirect_to users_interface_path
  end

  def change_layout
    Layout.change_layout(current_user, params[:name])
    redirect_to users_interface_path
  end

  def remove_layout
    Layout.remove_layout(current_user, params[:name])
    redirect_to users_interface_path
  end

end
