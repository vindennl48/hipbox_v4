class ComponentsController < ApplicationController
  before_action :authenticate_user!

  def ajax_modal
    respond_to do |format|
      format.html do
        render :partial => params['partial'],
               :locals  => params
      end
    end
  end

end
