class InterfaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "interface_channel_#{current_user.id}"
  end

  def unsubscribed
  end

  def update(data)
    ActionCable.server.broadcast "interface_channel_#{current_user.id}", data
  end

  def sync
    ActionCable.server.broadcast "interface_channel_#{current_user.id}", "Syncing"
  end
end
