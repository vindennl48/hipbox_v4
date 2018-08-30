JS.Layouts = {
  onLoad: function(edit="no"){
    let width = document.getElementById("wrap_gui").clientWidth
    let height = window.innerHeight
    GUI.paper = Raphael(
      document.getElementById('wrap'), width, height
    ).setViewBox(0, 0, width, height, true)
    JS.Layouts.Load()
  },

  Load: function(){
    $.ajax({url: '/layouts/ajax_load',
      type: 'GET',
      success: function(response){
        GUI.load(response, edit)
        JS.Layouts.GetVariables()
      },
      error: function(response){
        alert('Save Layout Failed..')
        console.log(response)
      }
    })
  },

  GetVariables: function(){
    $.ajax({url: '/notes/ajax_get_variables',
      type: 'GET',
      success: function(response){
        GUI.set_values({user_id:0, note:response})
      },
      error: function(response){ console.log('Issue getting variables: ', response) }
    })
  },

  Show: {
    onLoad: function(){ JS.Layouts.onLoad(edit="no") }
  },

  Edit: {
    onLoad: function(layout_id){
      JS.Layouts.onLoad(layout_id, edit="yes")

      for(var i=0; i<GUI.component_list.length; i++){
        let c = GUI.component_list[i]
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
