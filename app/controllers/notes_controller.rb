class NotesController < ApplicationController
  before_action :authenticate_user!

  def index
    @notes = Note.all.sort_by(&:osc)
  end

  def destroy
    Note.find(params[:id]).destroy
    redirect_to notes_path
  end

end
