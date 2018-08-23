App.interface = App.cable.subscriptions.create "InterfaceChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log("Interface Channel Connected")
    return 0

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (msg) ->
    # Called when there's incoming data on the websocket for this channel
    console.log(msg.data.note)
    return 0

  update: (msg) ->
    if typeof msg isnt 'undefined'
      @perform 'update', data: msg
    else
      @perform 'sync'
