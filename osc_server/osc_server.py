import mido, threading
from pythonosc import osc_server

mido.set_backend('mido.backends.pygame')

class OSC_SERVER:
    def __init__(self, midi_out='Bome MIDI Translator'):
        from pythonosc import dispatcher

        dispatcher = dispatcher.Dispatcher()
        dispatcher.map("/*/*/*", self._callback)
        self.input = osc_server.ThreadingOSCUDPServer(('192.168.99.1', 4004), dispatcher)
        self.output = midi_out

    def run(self):
        threading.Thread(target=self.input.serve_forever).start()
        return self

    def _callback(self, path, value):
        ch, t, n = tuple(path[1:].split('/'))
        ch = int(ch)
        if t == "cc": ch += 0xB0
        else:         ch += 0x90
        print(f"/{ch}/{n}/{value}")
        with mido.open_output(self.output) as output:
            output.send(
                mido.Message.from_bytes([
                    int(ch),
                    int(n),
                    int(value)
                ])
            )
