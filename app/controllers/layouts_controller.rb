class LayoutsController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(current_user.id)
    @user_name = User.user_name(@user)
    @layout = Layout.get_current_layout(@user)
    @layouts = Layout.where(user_id: @user.id)
  end

  def edit
    @user = User.find(current_user.id)
    @user_name = User.user_name(@user)
    @layout = Layout.find(params[:id])
  end

  def new
    Layout.create_new_layout(current_user, params[:name])
    redirect_to root_path
  end

  def destroy
    Layout.find(params[:id]).destroy
    Layout.get_current_layout(current_user)
    puts "layout id: #{current_user.layout}"
    redirect_to root_path
  end

  def update
    User.update(current_user.id, layout: params[:id])
    redirect_to root_path
  end

  def ajax_save_values
    Layout.save_values current_user, JSON.parse(params[:data])
    return 0
  end

  def ajax_save
    Layout.save_layout current_user, JSON.parse(params[:data])
    return 0
  end

  def ajax_load
    render json: get_layout
  end

  private
    def get_layout
      layout_id = Layout.find(current_user.layout).id
      return Component.where(layout_id: layout_id)
    end

end
