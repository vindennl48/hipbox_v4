class VariablesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "variables_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def change_value(msg)
    data = msg['data']
    note = Note.where(variable: data['variable'])
    if not note.empty?
      note = note.first
      Note.update(note.id, value: data['value'])
      ActionCable.server.broadcast "variables_channel",
        {user_id: current_user.id, note: note}
      $OSCRUBY.send OSC::Message.new(note.osc, data['value'])
    end
  end
end
