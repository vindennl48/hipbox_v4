class Component < ApplicationRecord
  belongs_to :layout

  def self.update_record(layout, d)
    if Component.exists? id: d['id']
      Component.update(d['id'],
        ctype: d['ctype'],
        x: d['x'],
        y: d['y'],
        width: d['width'],
        height: d['height'],
        color: d['color'],
        variable: d['variable'],
        extra: d['extra']
      )
    end
  end

  def self.update_value(layout, d)
    if Component.exists? id: d['id']
      Component.update(d['id'],
        value: d['value']
      )
    end
  end

end
