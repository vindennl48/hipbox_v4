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

  def sync_gui
    ActionCable.server.broadcast "interface_channel_#{current_user.id}", get_sync
  end

  private
    def get_sync
      return {
        gui: Layout.find(current_user.layout).gui['objects'],
        values: []
      }
    end
end
