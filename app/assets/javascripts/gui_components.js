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
  },

  slider_vertical: {
    init: function(paper, ID, x, y, width=60, height=300, color){

      // body
      this.body = paper.rect(x, y, width, height, 3)
        .attr({fill:'black', 'stroke-width':3, stroke:color})

      // volume filler
      this.filler = paper.rect(x, y+5, width, height-5, 3)
        .attr({fill:'#424242', 'stroke-width':3, stroke:color})

      // handle
      this.handle = paper.rect(x, y, width, 10, 3)
        .attr({fill:color, 'stroke-width':0, stroke:color})

      // container to hold all the pieces
      this.set = paper.set()
        .push(this.body)
        .push(this.filler)
        .push(this.handle)

      this.variable = ""
      this.id = ID
      this.volume = 0

      return this
    },

    drag: function(a, b, c){ this.set.drag(a, b, c); return this },

    set_width: function(width){
      this.body.attr('width', width)
      this.filler.attr('width', width)
      this.handle.attr('width', width)
    },

    set_height: function(height){
      this.body.attr('height', height)
      this.set_volume(this.volume)
    },

    set_volume: function(volume=0){
      if(volume > 127){ volume = 127 }
      else if(volume < 0){ volume = 0 }
      let v_percent = 1 - (volume / 127.0)

      let setbb = this.body.getBBox()
      let setbtm = setbb.y + setbb.height

      let handlebb = this.handle.getBBox()
      let handle_new_pos = ((setbb.height - handlebb.height) * v_percent) + setbb.y

      let fillerbb = this.filler.getBBox()
      let filler_y = fillerbb.y
      let filler_new_pos = handle_new_pos + (handlebb.height / 2)

      this.handle.translate(0, handle_new_pos - handlebb.y)
      this.filler.translate(0, filler_new_pos - fillerbb.y)
      fillerbb = this.filler.getBBox()
      this.filler.attr('height', setbtm - fillerbb.y)

      this.volume = volume

      return this
    },

    touch_volume: function(y){
      let setbb = this.set.getBBox()
      let setbtm = setbb.y + setbb.height
      let volume = ((setbb.height - (y - setbb.y)) * 127) / setbb.height
      if(volume > 127){ volume = 127 }
      else if(volume < 0){ volume = 0 }
      this.set_volume(volume)
      App.interface.update({variable: this.variable, value: volume})
      return this
    },

    set_variable: function(variable){
      this.variable = variable
      return this
    },

    edit_on: function(paper){
      GUI.width_ball = paper.circle(15, 15, 20)
        .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})

      GUI.height_ball = paper.circle(15, 15, 20)
        .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})

      setbb = this.set.getBBox()

      GUI.move_to(
        GUI.width_ball, 
        setbb.x + setbb.width - 20,
        setbb.y + setbb.height/2
      )
      GUI.move_to(
        GUI.height_ball, 
        setbb.x + setbb.width/2 - 20,
        setbb.y + setbb.height - 20
      )
    },

    edit_off: function(){
      GUI.remove_balls()
    },

    create: function(paper, ID, x, y, width, height, color, edit="no"){
      let a = Object.create(GUI.slider_vertical)
      if(edit == "no"){
        a.init(paper, ID, x, y, width, height, color)
          .set_volume(0)
          .drag(
            function(dx, dy, x, y){
              let offset = $('#wrap').offset().top
              a.touch_volume(y - offset)
            },
            function(){},
            function(){}
          )
      }
      else {
        a.init(paper, ID, x, y, width, height, color)
          .set_volume(100)
          .drag(
            function(dx, dy){
              if (!a.spos){a.spos = {x:0, y:0}}
              GUI.move_by(a.set, dx-a.spos.x, dy-a.spos.y)
              a.spos = {x:dx, y:dy}
            },
            function(){ a.edit_off() },
            function(){ 
              a.spos = undefined
              a.edit_on(paper)

              GUI.width_ball.drag(
                function(dx, dy){
                  let setbb = a.set.getBBox()
                  if (!GUI.width_ball.spos){GUI.width_ball.spos = 0}
                  GUI.move_by(GUI.width_ball, dx-GUI.width_ball.spos, 0)
                  a.set_width(setbb.width + dx-GUI.width_ball.spos)
                  GUI.move_to(
                    GUI.height_ball, 
                    setbb.x + setbb.width/2 - 20,
                    setbb.y + setbb.height - 20
                  )
                  GUI.width_ball.spos = dx
                },
                function(){},
                function(){ GUI.width_ball.spos = undefined }
              )

              GUI.height_ball.drag(
                function(dx, dy){
                  let setbb = a.set.getBBox()
                  if (!GUI.height_ball.spos){GUI.height_ball.spos = 0}
                  GUI.move_by(GUI.height_ball, 0, dy-GUI.height_ball.spos)
                  a.set_height(setbb.height + dy-GUI.height_ball.spos)
                  GUI.move_to(
                    GUI.width_ball, 
                    setbb.x + setbb.width - 20,
                    setbb.y + setbb.height/2
                  )
                  GUI.height_ball.spos = dy
                },
                function(){},
                function(){ GUI.height_ball.spos = undefined }
              )

            }
          )
      }
      return a
    }

  }

}
