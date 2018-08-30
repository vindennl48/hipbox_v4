class NotesController < ApplicationController
  before_action :authenticate_user!

  def index
    @notes = Note.all.sort_by(&:osc)
  end

  def destroy
    Note.find(params[:id]).destroy
    redirect_to notes_path
  end

  def ajax_new
    Note.create(variable: params[:variable], osc: params[:osc])
    return 0
  end

  def ajax_update
    Note.update(params[:id], variable: params[:variable], osc: params[:osc])
    return 0
  end

  def ajax_get_variables
    render json: Note.all
  end

end
