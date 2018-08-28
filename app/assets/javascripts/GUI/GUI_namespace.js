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

  add: function(ctype, layout_id){
    GUI.components.push(
      GUI[ctype].create(
        GUI.paper,
        GUI[ctype].default_values(layout_id),
        edit="yes"
      )
    )
  },

  // This sets the variables to new values
  set_values: function(data){
    if(data.user_id == 0){
      setTimeout(function(){
        for(var i=0; i<data.note.length; i++){
          for(var j=0; j<GUI.components.length; j++){
            if(GUI.components[j].variable == data.note[i].variable)
              GUI.components[j].set_value(data.note[i].value, update="no")
          }
        }
      }, 500)
    }
    else if(data.user_id != JS.user_id){
      setTimeout(function(){
        for(var i=0; i<GUI.components.length; i++){
          if(GUI.components[i].variable == data.note.variable)
            GUI.components[i].set_value(data.note.value, update="no")
        }
      }, 10)
    }
  },

  // Change Value on server
  change_value: function(data){ App.variables.change_value(data) },

  // This gets the layout to save to the db
  save_layout: function(){
    App.interface.save_layout(GUI.get('layout'))
    alert('Save Successful!')
  },

  // This gets the values to save to the db
  save_values: function(){
    App.interface.save_values(GUI.get('values'))
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

  activate_prop_modal: function(comp){
    $("#link_item_prop").prop('hidden', false)
    $("#text_field_variable").val(comp.variable)
    $("#text_field_color").val(comp.color)
    let btn_save = function(){
      comp.variable = $("#text_field_variable").val()
      comp.color = $("#text_field_color").val()
      comp.reload(GUI.paper, comp.get_layout_info()).edit_on()
    }
    $("#btn_save_item_prop").click(btn_save)
  },

  // --

  // Movement
  move_by: function(a, x=0, y=0){
    a.translate(x, y)
    return a
  },

  move_to: function(a, x, y){
    let x2 = x - a.getBBox().x
    let y2 = y - a.getBBox().y
    GUI.move_by(a, x2, y2)
    return a
  },

  snap: function(x){
    //return x%5<3 ? (x%5===0 ? x : Math.floor(x/5)*5) : Math.ceil(x/5)*5
    if(x < 0)
      return -(Math.floor(Math.abs(x)/5)*5)
    else
      return Math.floor(x/5)*5
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
