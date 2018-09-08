import mido
from pythonosc      import udp_client
from fcb1010_server import FCB1010_SERVER
from midi_server    import MIDI_SERVER
from osc_server     import OSC_SERVER

mido.set_backend('mido.backends.pygame')

if __name__ == "__main__":
    bome_out = mido.open_output('Bome MIDI Translator')
    osc_out  = udp_client.SimpleUDPClient('192.168.99.1', 4004)

    fcb  = FCB1010_SERVER(osc_out=osc_out).run()
    midi = MIDI_SERVER(osc_out=osc_out).run()
    osc  = OSC_SERVER(midi_out=bome_out).run()
