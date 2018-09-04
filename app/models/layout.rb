class Layout < ApplicationRecord
  belongs_to :user
  has_many :components, :dependent => :destroy

  def self.get_current_layout(user)
    if !user.layout.nil? and Layout.exists? id: user.layout
      return Layout.find(user.layout)
    else
      if Layout.exists? user_id: user.id
        layout = Layout.where(user_id: user.id).first
        User.update(user.id, layout: layout.id)
        return layout
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
        name: 'default'
      )
      User.update(user.id, layout: layout.id)
      return layout
    end
  end

  def self.create_new_layout(user, name)
    if name != nil and name != ''
      if Layout.exists? user_id: user.id, name: name
        User.update(user.id,
          layout: Layout.where(user_id: user.id, name: name).first.id 
        )
      else
        new_layout = Layout.create(user_id: user.id, name: name)
        User.update(user.id, layout: new_layout.id)
      end
    end
  end

  def self.save_layout(user, data)
    layout = Layout.find(user.layout)
    for d in data
      Component.update_record(layout, d)
    end
  end

  def self.save_values(user, data)
    layout = Layout.find(user.layout)
    for d in data
      Component.update_value(layout, d)
    end
  end

end
