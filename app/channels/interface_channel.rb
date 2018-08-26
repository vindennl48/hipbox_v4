class InterfaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "interface_channel_#{current_user.id}"
  end

  def unsubscribed
  end

  def change_value(msg)
    data = msg['data']
    note = Note.where(variable: data['variable']).first
    msg  = "/#{note.channel}" 
    msg += "/#{note.ntype}" 
    msg += "/#{note.note}" 
    $OSCRUBY.send OSC::Message.new(msg, data['value'])
  end

  def save_values(msg)
    data = msg['data']
    Layout.save_values(current_user, data)
  end

  def save_layout(msg)
    data = msg['data']
    Layout.save_layout(current_user, data)
  end

  def load_gui(msg)
    edit = msg['edit']
    ActionCable.server.broadcast "interface_channel_#{current_user.id}",
      {type: 'gui', data: get_gui, edit: edit}
  end

  private
    def get_gui
      layout_id = Layout.find(current_user.layout).id
      return Component.where(layout_id: layout_id)
    end
end
