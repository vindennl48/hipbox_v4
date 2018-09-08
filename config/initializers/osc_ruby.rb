$OSCRUBY = OSC::Client.new 4004, '192.168.99.1'

Thread.new do
  OSC.run do
    server = OSC::Server.new 4005, '0.0.0.0'

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

  end
end
