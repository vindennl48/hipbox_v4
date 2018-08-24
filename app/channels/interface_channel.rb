class InterfaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "interface_channel_#{current_user.id}"
  end

  def unsubscribed
  end

  def update(data)
    data = data['data']
    msg  = "/#{data['note']['member']}" 
    msg += "/#{data['note']['ntype']}" 
    msg += "/#{data['note']['note']}" 
    #ActionCable.server.broadcast "interface_channel_#{current_user.id}", msg
    $OSCRUBY.send OSC::Message.new(msg, data['value'])
  end

  def sync
    ActionCable.server.broadcast "interface_channel_#{current_user.id}", "Syncing"
  end
end
