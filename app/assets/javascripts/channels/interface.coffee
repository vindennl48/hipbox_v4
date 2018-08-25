App.interface = App.cable.subscriptions.create "InterfaceChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log("Interface Channel Connected")
    App.interface.update()
    return 0

  disconnected: ->
    # Called when the subscription has been terminated by the server
    return 0

  received: (msg) ->
    # Called when there's incoming data on the websocket for this channel
    if JS.Layouts.Loaded
      JS.Layouts.loadVars([])
    else
      JS.Layouts.loadGui(msg['gui'], [])
    return 0

  update: (msg) ->
    if typeof msg isnt 'undefined'
      @perform 'update', data: msg
    else
      @perform 'sync'
