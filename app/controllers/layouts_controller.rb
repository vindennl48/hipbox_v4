class LayoutsController < ApplicationController

  def new
    Layout.create_new_layout(current_user, params[:name])
    redirect_back fallback_location: users_interface_path
  end

  def change
    User.update(current_user.id, layout: params[:id])
    redirect_back fallback_location: users_interface_path
  end

  def destroy
    Layout.find(params[:id]).destroy
    Layout.get_current_layout(current_user)
    redirect_back fallback_location: users_interface_path
  end

  def update
    redirect_back fallback_location: users_interface_path
  end

end
