JS.Layouts.Edit = {
  paper: "raphael object",

  onLoad: function(){
    JS.Layouts.Mode = "edit"
    JS.Layouts.Loaded = false
    let width = document.getElementById("wrap_gui").clientWidth
    let height = window.innerHeight
    JS.Layouts.Edit.paper = Raphael(
      document.getElementById('wrap'), width, height)
      .setViewBox(0, 0, width, height, true)
    App.interface.load_gui()
  },

  loadGui: function(components){
    JS.Layouts.Components = []
    for(var i=0; i<components.length; i++){
      let c = components[i]
      if (c['ctype'] == "slider_vertical"){
        JS.Layouts.Components.push(
          GUI.slider_vertical.create(
            JS.Layouts.Edit.paper,
            c['id'], c['x'], c['y'],
            c['width'], c['height'], c['color'],
            c['extra'], c['variable'], c['value'],
            "edit"
          )
        )
      }
    }
  }
}
