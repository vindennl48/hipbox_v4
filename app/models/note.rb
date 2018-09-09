class Note < ApplicationRecord
  validates :variable, uniqueness: true
  validates :osc, uniqueness: true

  def self.process_note(value, variable:nil, osc:nil, user_id:0, ntype:nil)
    note = Note.find_note(variable:variable, osc:osc)
    if ntype == nil
      ntype = note.osc[1..-1].split('/')[1]
    end

    if note.variable == 'global_rec_toggle'
      if note.value == 0
        note = Note.update(note.id, value: 127)
        Note.broadcast_note(note, user_id:user_id)
        if Note.find_note(variable:'global_play').value.to_i == 0
          Note.find_update_and_submit_note(127, variable:'global_advance_playhead')
          sleep(0.05)
          Note.find_update_and_submit_note(127, variable:'global_play')
        end
        sleep(1)
        Note.find_update_and_submit_note(127, variable:'global_record')
      else
        Note.broadcast_note(note, user_id:0)
      end

    elsif note.variable == 'global_stop_all'
      Note.broadcast_note(
        Note.find_update_note(0, variable:'global_rec_toggle'), user_id:user_id)
      Note.find_update_note(0, variable:'global_play')

      Note.find_update_and_submit_note(0, variable:'global_stop_timeline')
      sleep(0.05)
      Note.find_update_and_submit_note(0, variable:'global_stop_clips')
      sleep(0.05)
      Note.find_update_and_submit_note(0, variable:'global_advance_playhead')

    elsif ntype == 'cc'
      note = Note.update(note.id, value: value.to_i)
      Note.submit_note(note)
    elsif ntype == 'n'
      if note.value.to_i > 0
        note = Note.update(note.id, value: 0)
      else
        note = Note.update(note.id, value: 127)
      end
      Note.submit_note(note)
    end

    return note
  end

  def self.broadcast_note(note, user_id:0)
    if user_id == 0
      note = [note]
    end
    ActionCable.server.broadcast "variables_channel",
      {user_id: user_id, note: note}
    return note
  end

  def self.find_note(variable:nil, osc:nil)
    if variable != nil and Note.exists? variable: variable
      return Note.where(variable: variable).first
    elsif osc != nil and Note.exists? osc: osc
      return Note.where(osc: osc).first
    end
    return false
  end

  def self.find_update_note(value, variable:nil, osc:nil)
    note = Note.find_note(variable:variable, osc:osc)
    if note
      return Note.update(note.id, value: value.to_i)
    else
      return false
    end
  end

  def self.find_update_and_submit_note(value, variable:nil, osc:nil)
    note = Note.submit_note(Note.find_update_note(value, variable:variable, osc:osc))
    if note
      return note
    else
      return false
    end
  end

  def self.submit_note(note)
    $OSCRUBY.send OSC::Message.new(note.osc, note.value.to_i)
    return note
  end

end
