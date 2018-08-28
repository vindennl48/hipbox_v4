class UpdateVariablesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    notes = Note.all
    for note in notes
      ActionCable.server.broadcast "variables_channel",
        {user_id: 0, note: Note.find(note.id)}
      sleep(0.25)
    end
  end

end
