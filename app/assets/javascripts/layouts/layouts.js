JS.Layouts = {

  Mode: "show",
  Loaded: false,
  Components: [],

  getValues: function(){
    let result = []
    let comp = JS.Layouts.Components
    for(var i=0; i<comp.length; i++){
      result.push(comp[i].get_value_info())
    }
    return result
  },

  getLayout: function(){
    let result = []
    let comp = JS.Layouts.Components
    for(var i=0; i<comp.length; i++){
      result.push(comp[i].get_layout_info())
    }
    return result
  },

  loadGui: function(gui, variables){
    if(JS.Layouts.Loaded){ return 0 }

    if(JS.Layouts.Mode == "show"){
      JS.Layouts.Show.loadGui(gui, variables)
      JS.Layouts.Loaded = true
    }
    else if (JS.Layouts.Mode == "edit"){
      JS.Layouts.Edit.loadGui(gui)
      JS.Layouts.Loaded = true
    }
  },

  loadVars: function(variables){
    //nothing here yet
  }

}
