App.variables = App.cable.subscriptions.create("VariablesChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
    console.log("Variables Channel Connected")
    App.variables.sending = 0
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel
    if(!App.variables.sending)
      GUI.set_values(data)
  },

  change_value: function(data) {
    App.variables.sending += 1
    setTimeout(function(){ App.variables.sending -= 1 }, 1000)
    return this.perform('change_value', { data: data })
  },

  update_variables: function() {
    return this.perform('update_variables')
  }

});
