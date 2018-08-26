let GUI = {

  move_by: function(a, x=0, y=0){
    a.translate(x, y)
    return a
  },

  move_to: function(a, x2=0, y2=0){
    let x1 = a.getBBox().x
    let y1 = a.getBBox().y
    GUI.move_by(a, x2-x1, y2-y1)
    return a
  },

  remove_balls: function(){
    if(GUI.width_ball != undefined){
      GUI.width_ball.remove()
    }
    if(GUI.height_ball != undefined){
      GUI.height_ball.remove()
    }
  }

}
