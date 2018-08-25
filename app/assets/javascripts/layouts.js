JS.Layouts = {

  Mode: "show",
  Loaded: false,

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
      App.interface.update()
    },

    loadGui: function(gui, variables){
      for(var i=0; i<gui.length; i++){
        let g = gui[i]
        if (g['type'] == "slider_vertical"){
          GUI.slider_vertical.create(
            JS.Layouts.Show.paper,
            g['id'], g['x'], g['y'],
            g['width'], g['height'], g['color']
          ).set_variable(g['variable'])
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
      App.interface.update()
    },

    loadGui: function(gui){
      for(var i=0; i<gui.length; i++){
        let g = gui[i]
        if (g['type'] == "slider_vertical"){
          GUI.slider_vertical.create(
            JS.Layouts.Edit.paper,
            g['id'], g['x'], g['y'],
            g['width'], g['height'], g['color'],
            "edit"
          ).set_variable(g['variable'])
        }
      }
    }
  }

}
