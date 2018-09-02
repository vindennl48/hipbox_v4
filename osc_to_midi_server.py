from OSC import OSCServer, OSCClient, OSCMessage
import types, pygame.midi

pygame.midi.init()
members = {
    '0': 0,
    '1'  : 1,
    '2'  : 2,
    '3'  : 3,
    '4'  : 4,
}
ntypes = "n cc".split()
midi_out = 5

def run(server):

##    for x in range(0,10):
##        if 'lof_band' in pygame.midi.get_device_info(x):
##            midi_out = x
    
    def callback(path, tags, args, source):
        print("incoming!")
        member_name, ntype, note = tuple(path[1:].split('/'))
        member = members[member_name]
        if ntype == "cc": member += 0xB0
        else:             member += 0x90
        print("--------------")
        print("path:   {}".format(path))
        print("member: {}".format(member_name))
        print("ntype:  {}".format(member))
        print("note:   {}".format(note))
        print("value:  {}".format(args[0]))
        print("--------------")
        pygame.midi.Output(midi_out).write_short(
            int(member),
            int(note),
            int(args[0])
        )

    def handle_error(self,request,client_address): pass

    for member in members.keys():
        for n in ntypes:
            for x in range(0,127):
                server.addMsgHandler("/{}/{}/{}".format(member, n, x), callback)

    server.handle_error = types.MethodType(handle_error, server)

    threading.Thread( target = server.serve_forever ).start()

if __name__ == "__main__":
    server = OSCServer(("192.168.99.1", 4004))
    run(server)

