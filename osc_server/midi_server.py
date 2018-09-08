import mido, threading
from pythonosc import udp_client

mido.set_backend('mido.backends.pygame')

class MIDI_SERVER:
    def __init__(self,
        midi_in='Bome MIDI Translator',
        osc_out=None
    ):
        if osc_out == None:
            osc_out = udp_client.SimpleUDPClient('192.168.99.1', 4004)
        self.input = midi_in
        self.output = osc_out

    def run(self):
        threading.Thread(target=self._listen).start()
        return self

    def _listen(self):
        for note in mido.open_input(self.input):
            self._process_note(note)
        print("midi server exited!")

    def _process_note(self, note):
        if note.channel >= 0:
            if note.type == "control_change":
                osc = f"/midi/{note.channel}/cc/{note.control}"
                print(f"midi_server::note: {note}")
                print(f"midi_server::osc: {osc}\n")
                self.output.send_message(osc, note.value)
            elif note.type == "note_on":
                if note.velocity > 0:
                    osc = f"/midi/{note.channel}/cc/{note.control}"
                    print(f"midi_server::note: {note}")
                    print(f"midi_server::osc: {osc}\n")
                    self.output.send_message(osc, 127)
