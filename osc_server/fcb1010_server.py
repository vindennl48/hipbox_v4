from pythonosc import udp_client
import mido, threading

mido.set_backend('mido.backends.pygame')

class FCB1010_SERVER:
    def __init__(self,
        channel=0,
        midi_in='3- Scarlett 18i20 USB',
        osc_out=None
    ):
        if osc_out == None:
            osc_out = udp_client.SimpleUDPClient('192.168.99.1', 4004)
        self.input = midi_in
        self.output = osc_out
        self.channel = channel
        self.fcb_map = self._get_fcb_map()

    def run(self):
        threading.Thread(target=self._listen).start()
        return self

    def _get_fcb_map(self):
        fcb_map = {}
        for x in range(10):
            # all common pedals here
            #  [f"{x*10+n}"] where n == pedal 1-10
            fcb_map[f"{x*10+1}"]  = 'mitch_fx_low_cut'
            fcb_map[f"{x*10+2}"]  = 'mitch_fx_hi_cut'
            fcb_map[f"{x*10+3}"]  = 'mitch_fx_dist'
            fcb_map[f"{x*10+4}"]  = 'mitch_fx_delay'
            fcb_map[f"{x*10+5}"]  = 'mitch_fx_reverb'
            fcb_map[f"{x*10+6}"]  = 'mitch_fx_talkback'
            fcb_map[f"{x*10+10}"] = 'mitch_fx_stop'

        fcb_map.update({
            "126": 'mitch_fx_vol',
            "127": 'mitch_fx_super_verb',

            "07": 'sono_play_song',
            "08": 'sono_play_intro',
            "09": 'sono_play_click',

            "17": 'chrono_play_song',
            "18": 'chrono_play_intro',
            "19": 'chrono_play_click',

            "27": 'old_pete_play_song',
            "28": 'old_pete_play_intro',
            "29": 'old_pete_play_click',

            "37": 'blind_play_song',
            "38": 'blind_play_intro',
            "39": 'blind_play_click',

            "47": 'petrichor_play_song',
            "48": 'petrichor_play_intro',
            "49": 'petrichor_play_click',

            "57": 'space_play_song',
            "58": 'space_play_intro',
            "59": 'space_play_click',
        })
        return fcb_map

    def _listen(self):
        for note in mido.open_input(self.input):
            self._process_note(note)
        print("fcb1010_server exited!")

    def _process_note(self, note):
        if note.channel != self.channel: return 0

        if note.type == 'control_change':
            variable = self.fcb_map[f"{note.control}"]
            print(f"fcb1010_server::note: {note}")
            print(f"fcb1010_server::variable: {variable}\n")
            self.output.send_message(f"/variable/{variable}", note.value)
        elif note.type == 'note_on':
            if note.velocity > 0:
                variable = self.fcb_map[f"{note.note}"]
                print(f"fcb1010_server::note: {note}")
                print(f"fcb1010_server::variable: {variable}\n")
                self.output.send_message(f"/variable/{variable}", 127)

