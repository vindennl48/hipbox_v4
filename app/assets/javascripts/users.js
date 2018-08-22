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
      let paper = JS.Users.Interface.paper
      let width = document.getElementById("wrap_gui").clientWidth
      let height = window.innerHeight
      paper = Raphael(document.getElementById('wrap'), width, height)
        .setViewBox(0, 0, width, height, true)
      GUI.slider_vertical.create(paper, 15, 15, 60, 300, "orange")
      GUI.slider_vertical.create(paper, (75*1)+15, 15, 60, 300, "green")
      GUI.slider_vertical.create(paper, (75*2)+15, 15, 60, 300, "yellow")
      GUI.slider_vertical.create(paper, (75*3)+15, 15, 60, 300, "blue")
    }
  }

}
