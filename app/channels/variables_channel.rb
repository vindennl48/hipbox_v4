class VariablesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "variables_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def change_value(msg)
    data = msg['data']
    Note.broadcast_note(
      Note.process_note(
        data['value'],
        variable:data['variable'],
        user_id:current_user.id
      ), user_id:current_user.id
    )
  end
end
