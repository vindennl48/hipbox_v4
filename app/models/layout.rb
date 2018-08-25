class Layout < ApplicationRecord
  belongs_to :user

  def self.get_current_layout(user)
    if !user.layout.nil? and Layout.exists? id: user.layout
      return Layout.find(user.layout)
    else
      if Layout.exists? user_id: user.id
        return Layout.where(user_id: user.id).first
      else
        return self.get_default_layout(user)
      end
    end
  end

  def self.get_default_layout(user)
    if Layout.exists? user_id: user.id, name: 'default'
      layout = Layout.where(user_id: user.id, name: 'default').first
      User.update(user.id, layout: layout.id)
      return layout
    else
      layout = Layout.create(
        user_id: user.id,
        gui: {objects: []},
        name: 'default'
      )
      User.update(user.id, layout: layout.id)
      return layout
    end
  end

  def self.create_new_layout(user, name)
    if name != nil and name != ''
      if Layout.exists? user_id: user.id, name: name
        User.update(
          user.id,
          layout: Layout.where(user_id: user.id, name: name).first.id 
        )
      else
        new_layout = Layout.create(user_id: user.id, name: name, gui: {objects: []})
        User.update(user.id, layout: new_layout.id)
      end
    end
  end

  def self.save_layout(user, data)
    layout = Layout.find(user.layout)
    gui = layout.gui
    for d in data
      gui['objects'].each_with_index do |comp, x|
        if comp['id'] == d['id']
          gui['objects'][x]['x'] = d['x']
          gui['objects'][x]['y'] = d['y']
          gui['objects'][x]['width'] = d['width']
          gui['objects'][x]['height'] = d['height']
          gui['objects'][x]['color'] = d['color']
          gui['objects'][x]['variable'] = d['variable']
          break
        end
      end
    end
    Layout.update(user.layout, gui: gui)
  end

  def self.save_values(user, data)
    layout = Layout.find(user.layout)
    gui = layout.gui
    for d in data
      gui['objects'].each_with_index do |comp, x|
        if comp['id'] == d['id']
          gui['objects'][x]['value'] = d['value']
          break
        end
      end
    end
    Layout.update(user.layout, gui: gui)
  end

end
