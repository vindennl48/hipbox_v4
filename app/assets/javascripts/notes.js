// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

JS.Notes = {

  save: function(){
    let notes = $("div[type='note']")
    $.each($("div[type='note']"), function(i, note){
      let variable = $(note).find("#variable").val()
      let osc = $(note).find("#osc").val()
      if(note.id == ""){
        App.interface.note_new({
          'variable': variable,
          'osc': osc,
        })
      }
      else{
        App.interface.note_update({
          'id': note.id,
          'variable': variable,
          'osc': osc
        })
      }
    })
  }

}
