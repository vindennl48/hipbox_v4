let GUI = {

  // This stores all of the individual
  //  types of components that can be
  //  added to the screen.
  component_list: [],

  // This stores all of the individual
  //  resizing charms/balls on the screen
  charms: {},

  // This is the current raphaeljs paper
  //  and components on that paper
  paper: undefined,
  components: [],

  // This loads the individual components
  //  into the component_list.
  add_component: function(component){
    GUI.component_list.push({
      ctype: component.ctype,
      name: component.name 
    })
    GUI[component.ctype] = component
  },

  // This loads the current layout onto
  //  the screen.
  load: function(components, edit="no"){
    for(var i=0; i<GUI.components.length; i++)
      GUI.components[i].remove()
    GUI.components = []
    for(var i=0; i<components.length; i++){
      let c = components[i]
      GUI.components.push( GUI[c.ctype].create(GUI.paper, c, edit) )
    }
  },

  // This sets the variables to new values
  set_values: function(data){},

  // Change Value on server
  change_value: function(data){ App.interface.change_value(data) },

  // This gets the layout to save to the db
  save_layout: function(){
    App.interface.save_layout(this.get('layout'))
    alert('Save Successful!')
  },

  // This gets the values to save to the db
  save_values: function(){
    App.interface.save_values(this.get('values'))
  },

  // Helper function for getting layout and values
  get: function(info){
    let result = []
    let c = GUI.components
    for(var i=0; i<c.length; i++){
      if(info == 'layout')
        result.push( c[i].get_layout_info() )
      else if(info == 'values')
        result.push( c[i].get_value_info() )
    }
    return result
  },

  // --

  // Movement
  move_by: function(a, x=0, y=0){
    a.translate(x, y)
    return a
  },

  move_to: function(a, x, y){
    if(x != undefined){
      let x1 = a.getBBox().x
      GUI.move_by(a, x-x1)
    }
    if(y != undefined){
      let y1 = a.getBBox().y
      GUI.move_by(a, 0, y-y1)
    }
    return a
  },
  // --

  // Resizing
  clear_charms: function(){
    for (var key in GUI.charms)
      GUI.charms[key].remove()
    GUI.charms = {}
  },

  add_to_charm_list: function(name, a){
    GUI.charms[name] = a
    return a
  },
  // --

}
