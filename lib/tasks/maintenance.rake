namespace :maintenance do

  desc "TODO"
  task copy_layout: :environment do
    layout_id = 1
    new_user_id = 4

    old_user_name = 'mitch'
    new_user_name = 'drums'

    layout = Layout.find(layout_id)
    components = Component.where(layout_id: layout)

    layout_new = layout.dup
    layout_new.user_id = new_user_id
    layout_new.name = 'default'
    layout_new.save

    components.each do |component|
      component_new = component.dup
      component_new.layout_id = layout_new.id
      v = component_new.variable
      if v.match(/^#{old_user_name}_#{old_user_name}_solo/).present?
        component_new.variable.gsub!(/#{old_user_name}_#{old_user_name}_solo/, "#{new_user_name}_#{old_user_name}_mute")
      elsif v.match(/^#{old_user_name}_#{new_user_name}_mute/).present?
        component_new.variable.gsub!(/#{old_user_name}_#{new_user_name}_mute/, "#{new_user_name}_#{new_user_name}_solo")
      elsif v.match(/^#{old_user_name}/).present?
        component_new.variable.gsub!(/^#{old_user_name}/, "#{new_user_name}")
      end
      component_new.save
    end

    puts "done!"

  end


  desc "TODO"
  task default_notes: :environment do
    members = ['james', 'mitch', 'jesse', 'drums']
    values = ['vol', 'pan', 'mute']
    global = ['talkback_toggle', 'stop_all', 'rec_toggle',
              'advance_playhead', 'play', 'record', 'stop_timeline',
              'stop_clips']

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

    # pedalboard
    create_note "mitch_fx_low_cut",     "/0/cc/0"
    create_note "mitch_fx_hi_cut",      "/0/cc/1"
    create_note "mitch_fx_dist",        "/0/cc/2"
    create_note "mitch_fx_delay",       "/0/cc/3"
    create_note "mitch_fx_reverb",      "/0/cc/4"
    create_note "mitch_fx_vol",         "/0/cc/126"
    create_note "mitch_fx_super_verb",  "/0/cc/127"

    create_note "blind_play_song",      "/15/cc/0"
    create_note "blind_play_intro",     "/15/cc/1"
    create_note "blind_play_click",     "/15/cc/2"

    create_note "chrono_play_song",     "/15/cc/3"
    create_note "chrono_play_intro",    "/15/cc/4"
    create_note "chrono_play_click",    "/15/cc/5"

    create_note "old_pete_play_song",   "/15/cc/6"
    create_note "old_pete_play_intro",  "/15/cc/7"
    create_note "old_pete_play_click",  "/15/cc/8"

    create_note "sono_play_song",       "/15/cc/9"
    create_note "sono_play_intro",      "/15/cc/10"
    create_note "sono_play_click",      "/15/cc/11"

    create_note "petrichor_play_song",  "/15/cc/12"
    create_note "petrichor_play_intro", "/15/cc/13"
    create_note "petrichor_play_click", "/15/cc/14"

    create_note "space_play_song",      "/15/cc/15"
    create_note "space_play_intro",     "/15/cc/16"
    create_note "space_play_click",     "/15/cc/17"

    puts "Done!"
  end

end
