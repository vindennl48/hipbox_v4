class LayoutsController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(current_user.id)
    @user_name = User.user_name(@user)
    @layout = Layout.get_current_layout(@user)
    @layouts = Layout.where(user_id: @user.id)
  end

  def new
    Layout.create_new_layout(current_user, params[:name])
    redirect_to root_path
  end

  def edit
    @user = User.find(current_user.id)
    @user_name = User.user_name(@user)
    @layout = Layout.find(params[:id])
  end

  def destroy
    Layout.find(params[:id]).destroy
    Layout.get_current_layout(current_user)
    redirect_to root_path
  end

  def update
    puts "user update"
    User.update(current_user.id, layout: params[:id])
    redirect_to root_path
  end

end
