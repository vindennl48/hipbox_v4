App.interface = App.cable.subscriptions.create "InterfaceChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log("Interface Channel Connected")
    App.interface.load_gui()
    return 0

  disconnected: ->
    # Called when the subscription has been terminated by the server
    return 0

  received: (msg) ->
    # Called when there's incoming data on the websocket for this channel
    if not JS.Layouts.Loaded
      JS.Layouts.loadGui(msg)
    return 0

  change_value: (msg) ->
    # Called when a signal is being sent to Ableton
    @perform 'change_value', data: msg

  save_values: ->
    @perform 'save_values', data: JS.Layouts.getValues()

  save_layout: ->
    @perform 'save_layout', data: JS.Layouts.getLayout()

  load_gui: ->
    @perform 'load_gui'

