class UsersController < ApplicationController
  before_action :authenticate_user!

  def interface
  end

end
