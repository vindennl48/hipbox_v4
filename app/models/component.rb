class Component < ApplicationRecord
  belongs_to :layout

  def self.update_record(layout, d)
    if d.key? 'id' and Component.exists? id: d['id']
      if d.key? 'remove'
        Component.find(d['id']).destroy
      else
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
    else
      if not d.key? 'remove'
        Component.create(
          ctype: d['ctype'],
          x: d['x'],
          y: d['y'],
          width: d['width'],
          height: d['height'],
          color: d['color'],
          variable: d['variable'],
          value: d['value'],
          layout_id: layout.id,
          extra: d['extra']
        )
        puts "new update record: #{layout}, #{d}"
      end
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
