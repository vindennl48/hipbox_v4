class InterfaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "interface_channel_#{current_user.id}"
  end

  def unsubscribed
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

  def note_new(data)
    d = data['data']
    Note.create(variable: d['variable'], osc: d['osc'])
  end

  def note_update(data)
    d = data['data']
    Note.update(d['id'], 'variable': d['variable'], 'osc': d['osc'])
  end

  private
    def get_gui
      layout_id = Layout.find(current_user.layout).id
      return Component.where(layout_id: layout_id)
    end
end
