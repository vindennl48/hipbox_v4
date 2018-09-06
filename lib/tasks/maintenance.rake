namespace :maintenance do

  desc "TODO"
  task copy_layout: :environment do
    layout_id = 33
    new_user_id = 4

    layout = Layout.find(layout_id)
    components = Component.where(layout_id: layout)

    layout_new = layout.dup
    layout_new.user_id = new_user_id
    layout_new.name = 'default'
    layout_new.save

    components.each do |component|
      component_new = component.dup
      component_new.layout_id = layout_new.id
      component_new.save
    end

    puts "done!"

  end


  desc "TODO"
  task default_notes: :environment do
    members = ['james', 'mitch', 'jesse', 'drums']
    values = ['vol', 'pan', 'mute']
    global = ['talkback', 'rec']

    def create_note(variable, osc)
      if Note.exists? variable: variable
        Note.update(Note.where(variable: variable).first.id,
          variable: variable, osc: osc, value: 0)
        puts " - Update - Variable: #{variable}, OSC: #{osc}"
      elsif Note.exists? osc: osc
        Note.update(Note.where(osc: osc).first.id,
          variable: variable, osc: osc, value: 0)
        puts " - Update - Variable: #{variable}, OSC: #{osc}"
      else
        Note.create(variable: variable, osc: osc, value: 0)
        puts " - Create - Variable: #{variable}, OSC: #{osc}"
      end
    end

    members.each_with_index do |member, ch|
      note = 0
      members.each do |member2|

        values.each do |value|
          if value == 'mute' and member == member2
            variable = "#{member}_#{member2}_solo"
          else
            variable = "#{member}_#{member2}_#{value}"
          end
          osc = "/#{ch+1}/cc/#{note}"
          note += 1
          create_note variable, osc
        end

      end

      ['click', 'talkback', 'hp'].each do |misc|
        variable = "#{member}_#{misc}_vol"
        osc = "/#{ch+1}/cc/#{note}"
        note += 1
        create_note variable, osc
      end

    end

    note = 0
    global.each do |g|
      variable = "global_#{g}"
      osc = "/5/cc/#{note}"
      note += 1
      create_note variable, osc
    end

    puts "Done!"
  end

end
