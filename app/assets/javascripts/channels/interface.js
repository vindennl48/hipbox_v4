App.interface = App.cable.subscriptions.create("InterfaceChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
    App["interface"].initialized = true
    console.log("Interface Channel Connected")
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(msg) {
    // Called when there's incoming data on the websocket for this channel
    if      (msg.type == 'gui')    { GUI.load(msg.data, msg.edit) }
    else if (msg.type == 'values') { GUI.set_values(msg.data) }
  },

  change_value: function(value) {
    return this.perform('change_value', { data: value })
  },

  save_values: function(values) {
    return this.perform('save_values', { data: values })
  },

  save_layout: function(layout) {
    return this.perform('save_layout', { data: layout })
  },

  load_gui: function(edit) {
    return this.perform('load_gui', { edit: edit })
  },

  note_new: function(data) {
    return this.perform('note_new', { data: data })
  },

  note_update: function(data) {
    return this.perform('note_update', { data: data })
  }

})



// App.interface = App.cable.subscriptions.create "InterfaceChannel",
//   connected: ->
//     # Called when the subscription is ready for use on the server
//     console.log("Interface Channel Connected")
//     App.interface.initialized = true
//     return 0
// 
//   disconnected: ->
//     # Called when the subscription has been terminated by the server
//     return 0
// 
//   received: (msg) ->
//     # Called when there's incoming data on the websocket for this channel
//     if msg.type is 'gui'         then GUI.load(msg.data, msg.edit)
//     else if msg.type is 'values' then GUI.set_values(msg.data)
//     return 0
// 
//   change_value: (value) ->
//     # Called when a signal is being sent to Ableton
//     @perform 'change_value', data: value
// 
//   save_values: (values) ->
//     @perform 'save_values', data: values
// 
//   save_layout: (layout) ->
//     @perform 'save_layout', data: layout
// 
//   load_gui: (edit) ->
//     @perform 'load_gui', edit: edit
// 
//   note_new: (data) ->
//     @perform 'note_new', data: data
// 
//   note_update: (data) ->
//     @perform 'note_update', data: data
// 
