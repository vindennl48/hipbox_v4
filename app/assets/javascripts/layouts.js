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

    let waitForVariables = function(){
      if(App.variables.sending != undefined)
        App.variables.update_variables()
      else
        setTimeout(waitForVariables, 250)
    }
    waitForVariables()
  },

  Show: {
    onLoad: function(){ JS.Layouts.onLoad(edit="no") }
  },

  Edit: {
    onLoad: function(layout_id){
      JS.Layouts.onLoad(layout_id, edit="yes")
      for(var i=0; i<GUI.component_list.length; i++){
        let c = GUI.component_list[i]
        console.log(c)
        $("#dropdown_component_list").append(`
          <a class=" dropdown-item "
            type="`+c['ctype']+`"
            href="javascript:void(0)"
            data-toggle="collapse" data-target="#navbarSupportedContent" 
            onclick="GUI.add('`+c['ctype']+`', `+layout_id+`)">`+c['name']+`</a>
        `)
      }
    }
  }

}
