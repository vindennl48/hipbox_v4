JS.Layouts = {

  Mode: "show",
  Loaded: false,
  Components: [],

  getValues: function(){
    let result = []
    let comp = JS.Layouts.Components
    for(var i=0; i<comp.length; i++){
      let c = comp[i]
      result.push({
        "id": c.id,
        "value": c.value
      })
    }
    return result
  },

  getLayout: function(){
    let result = []
    let comp = JS.Layouts.Components
    for(var i=0; i<comp.length; i++){
      let c = comp[i]
      let bodybb = c.body.getBBox()
      result.push({
        "id": c.id,
        "x": bodybb.x,
        "y": bodybb.y,
        "width": bodybb.width,
        "height": bodybb.height,
        "color": c.color,
        "variable": c.variable
      })
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
  },

  Show: {
    paper: "raphael object",

    onLoad: function(){
      JS.Layouts.Mode = "show"
      JS.Layouts.Loaded = false
      let width = document.getElementById("wrap_gui").clientWidth
      let height = window.innerHeight
      JS.Layouts.Show.paper = Raphael(
        document.getElementById('wrap'), width, height)
        .setViewBox(0, 0, width, height, true)
      App.interface.sync_gui()
    },

    loadGui: function(gui, variables){
      JS.Layouts.Components = []
      for(var i=0; i<gui.length; i++){
        let g = gui[i]
        if (g['type'] == "slider_vertical"){
          JS.Layouts.Components.push(
            GUI.slider_vertical.create(
              JS.Layouts.Show.paper,
              g['id'], g['x'], g['y'],
              g['width'], g['height'], g['color']
            )
              .set_variable(g['variable'])
              .set_volume(g['value'])
          )
        }
      }
    }
  },

  Edit: {
    paper: "raphael object",

    onLoad: function(){
      JS.Layouts.Mode = "edit"
      JS.Layouts.Loaded = false
      let width = document.getElementById("wrap_gui").clientWidth
      let height = window.innerHeight
      JS.Layouts.Edit.paper = Raphael(
        document.getElementById('wrap'), width, height)
        .setViewBox(0, 0, width, height, true)
      App.interface.sync_gui()
    },

    loadGui: function(gui){
      JS.Layouts.Components = []
      for(var i=0; i<gui.length; i++){
        let g = gui[i]
        if (g['type'] == "slider_vertical"){
          JS.Layouts.Components.push(
            GUI.slider_vertical.create(
              JS.Layouts.Edit.paper,
              g['id'], g['x'], g['y'],
              g['width'], g['height'], g['color'],
              "edit"
            ).set_variable(g['variable'])
          )
        }
      }
    }
  }

}
