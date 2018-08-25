class InterfaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "interface_channel_#{current_user.id}"
  end

  def unsubscribed
  end

  def update(data)
    data = data['data']
    note = Note.where(variable: data['variable']).first
    msg  = "/#{note.channel}" 
    msg += "/#{note.ntype}" 
    msg += "/#{note.note}" 
    $OSCRUBY.send OSC::Message.new(msg, data['value'])
  end

  def sync
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
