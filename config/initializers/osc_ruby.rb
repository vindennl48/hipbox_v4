$OSCRUBY = OSC::Client.new 4004, '192.168.99.1'

Thread.new do
  OSC.run do
    server = OSC::Server.new 4005, '0.0.0.0'

    # from fcb1010 or other external midi device
    server.add_pattern %r{variable/.*} do |*args|
      vars = args[0][1..-1].split('/')
      variable = vars[1]
      value = args[1]

      if Note.exists? variable: variable
        note = Note.where(variable: variable).first
        if note.value.to_i > 0
          note.value = 0
        else
          note.value = 127
        end
        note.save
        ActionCable.server.broadcast "variables_channel",
          {user_id: 0, note: [note]}
        $OSCRUBY.send OSC::Message.new(note.osc, note.value.to_i)
      end

    end

    # from ableton
    server.add_pattern %r{midi/.*} do |*args|
      vars = args[0][1..-1].split('/')
      chan = vars[1].to_i
      ntype = vars[2]
      value = args[1].to_i
      osc = args[0][5..-1]

      if chan == 15 and Note.exists? osc: osc
        note = Note.where(osc: osc).first
        if ntype == 'cc'
          #puts "osc: #{osc}, note: #{note}, value: #{value}"
          note.value = value
          note.save
          ActionCable.server.broadcast "variables_channel",
            {user_id: 0, note: [note]}
        end
      end

    end

  end
end
