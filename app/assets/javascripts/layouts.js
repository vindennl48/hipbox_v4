JS.Layouts = {
  onLoad: function(edit="no"){
    let width = document.getElementById("wrap_gui").clientWidth
    let height = window.innerHeight
    GUI.paper = Raphael(
      document.getElementById('wrap'), width, height)
      .setViewBox(0, 0, width, height, true)

    let waitForInterface = function(){
      if(App.interface.initialized != undefined)
        App.interface.load_gui(edit) 
      else
        setTimeout(waitForInterface, 250)
    }
    waitForInterface()
  },

  Show: {
    onLoad: function(){ JS.Layouts.onLoad(edit="no") }
  },

  Edit: {
    onLoad: function(){ JS.Layouts.onLoad(edit="yes") }
  }

}
