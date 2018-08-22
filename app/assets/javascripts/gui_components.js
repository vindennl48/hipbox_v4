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

  slider_vertical: {
    init: function(paper, x, y, width=60, height=300, color){

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

      return this
    },

    drag: function(a, b, c){ this.set.drag(a, b, c); return this },

    set_volume: function(volume=0){
      if(volume > 127){ volume = 127 }
      else if(volume < 0){ volume = 0 }
      let v_percent = 1 - (volume / 127.0)

      let setbb = this.set.getBBox()
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

      return this
    },

    touch_volume: function(y){
      let setbb = this.set.getBBox()
      let setbtm = setbb.y + setbb.height
      let volume = ((setbb.height - (y - setbb.y)) * 127) / setbb.height
      this.set_volume(volume)
      return this
    },

    create: function(paper, x, y, width, height, color){
      let a = Object.create(GUI.slider_vertical)
        .init(paper, x, y, width, height, color)
        .set_volume(0)
        //.touch_volume(300)
        .drag(
          function(dx, dy, x, y){
            let offset = $('#wrap').offset().top
            a.touch_volume(y - offset)
          },
          function(){},
          function(){}
        )

      return a
    }

  }

}
