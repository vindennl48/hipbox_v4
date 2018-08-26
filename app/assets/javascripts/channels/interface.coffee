App.interface = App.cable.subscriptions.create "InterfaceChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log("Interface Channel Connected")
    App.interface.initialized = true
    return 0

  disconnected: ->
    # Called when the subscription has been terminated by the server
    return 0

  received: (msg) ->
    # Called when there's incoming data on the websocket for this channel
    if msg.type is 'gui'         then GUI.load(msg.data, msg.edit)
    else if msg.type is 'values' then GUI.set_values(msg.data)
    return 0

  change_value: (value) ->
    # Called when a signal is being sent to Ableton
    @perform 'change_value', data: value

  save_values: (values) ->
    @perform 'save_values', data: values

  save_layout: (layout) ->
    @perform 'save_layout', data: layout

  load_gui: (edit) ->
    @perform 'load_gui', edit: edit

