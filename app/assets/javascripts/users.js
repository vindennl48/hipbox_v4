JS.Users = {

  Login: {
    onLoad: function(){
      let buttons = document.querySelectorAll("[type='button']")
      for(var i=0; i<buttons.length; i++){
        buttons[i].onclick = function(){
          document.getElementById("btn_submit").hidden = false
          document.getElementById("email").value = this.id
        }
      }
    }
  },

  Interface: {
    paper: "raphael object",

    onLoad: function(){
      let width = document.getElementById("wrap_gui").clientWidth
      let height = window.innerHeight
      JS.Users.Interface.paper = Raphael(
        document.getElementById('wrap'), width, height)
        .setViewBox(0, 0, width, height, true)
    },

    loadGui: function(gui, variables){
      for(var i=0; i<gui.length; i++){
        let g = gui[i]
        if (g['type'] == "slider_vertical"){
          GUI.slider_vertical.create(
            JS.Users.Interface.paper,
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
      let width = document.getElementById("wrap_gui").clientWidth
      let height = window.innerHeight
      JS.Users.Edit.paper = Raphael(
        document.getElementById('wrap'), width, height)
        .setViewBox(0, 0, width, height, true)
    },

    loadGui: function(gui){
      for(var i=0; i<gui.length; i++){
        let g = gui[i]
        if (g['type'] == "slider_vertical"){
          GUI.slider_vertical.create(
            JS.Users.Edit.paper,
            g['id'], g['x'], g['y'],
            g['width'], g['height'], g['color'],
            "edit"
          ).set_variable(g['variable'])
        }
      }
    }
  }

}
