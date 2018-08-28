GUI.add_component({
  ctype: 'slider_vertical',              // primary key in component table
  name:  'Slider Vertical',              // display name

  init: function(paper, record){
    // Component Variables
    this.paper     = paper               // raphaeljs paper
    this.id        = record['id']        // primary key in component table
    this.color     = record['color']     // base color value
    this.extra     = record['extra']     // anything extra needed
    this.variable  = record['variable']  // midi note variable
    this.value     = record['value']     // saved value
    this.layout_id = record['layout_id'] // saved value
    // --

    // RaphaelJS Items
    // temporary defaults
    let x = 0, y = 0, width = 60, height = 300

    this.body = paper.rect(x, y, width, height, 3)
      .attr({fill:'black', 'stroke-width':3, stroke:this.color})

    this.filler = paper.rect(x, y+5, width, height-5, 3)
      .attr({fill:'#424242', 'stroke-width':3, stroke:this.color})

    this.handle = paper.rect(x, y, width, 10, 3)
      .attr({fill:this.color, 'stroke-width':0, stroke:this.color})
    // --

    // Container to hold all the pieces
    this.set = paper.set()
      .push(this.body)
      .push(this.filler)
      .push(this.handle)
    // --

    // Move into position and resize
    this.x(record['x'])
    this.y(record['y'])
    this.width(record['width'])
    this.height(record['height'])
    // --

    return this
  },

  default_values: function(layout_id){
    return {
      "id":        undefined,
      "ctype":     this.ctype,
      "x":         15,
      "y":         15,
      "width":     60,
      "height":    300,
      "color":     'orange',
      "extra":     {},
      "layout_id": layout_id,
      "variable":  '',
      "value":     0
    }
  },

  // Size & Position
  x: function(x){ 
    if(x == undefined){ return this.body.getBBox().x }
    else{ GUI.move_to(this.set, x); return this }
  },
  y: function(y){ 
    if(y == undefined){ return this.body.getBBox().y }
    else{ GUI.move_to(this.set, this.x(), y); return this }
  },
  width: function(width){
    if(width == undefined){
      return this.body.getBBox().width 
    }
    else{ 
      this.body.attr('width', width)
      this.filler.attr('width', width)
      this.handle.attr('width', width)
      return this 
    }
  },

  height: function(height){
    if(height == undefined){
      return this.body.getBBox().height 
    }
    else{ 
      this.body.attr('height', height)
      this.set_value(this.value, update="no")
      return this
    }
  },

  drag: function(a, b, c){
    this.set.drag(a, b, c)
    return this
  },
  // --

  // Layout saving, changing, etc.
  edit_on: function(){
    width_ball = GUI.add_to_charm_list(
      'width_ball',
      this.paper.circle(15, 15, 20)
        .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})
    )

    height_ball = GUI.add_to_charm_list(
      'height_ball',
      this.paper.circle(15, 15, 20)
        .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})
    )

    setbb = this.set.getBBox()

    GUI.move_to(
      width_ball, 
      setbb.x + setbb.width - 20,
      setbb.y + setbb.height/2 - 20
    )
    GUI.move_to(
      height_ball, 
      setbb.x + setbb.width/2 - 20,
      setbb.y + setbb.height - 20
    )
  },

  edit_off: function(){ GUI.clear_charms() },

  get_layout_info: function(){
    return {
      "id":        this.id,
      "ctype":     this.ctype,
      "x":         this.x(),
      "y":         this.y(),
      "width":     this.width(),
      "height":    this.height(),
      "color":     this.color,
      "extra":     this.extra,
      "layout_id": this.layout_id,
      "variable":  this.variable,
      "value":     this.value
    }
  },

  get_value_info: function(){
    return {
      "id":    this.id,
      "value": this.value
    }
  },

  remove: function(){
    this.body.remove()
    this.filler.remove()
    this.handle.remove()
  },

  // Component Specific
  set_value: function(volume=0, update="yes"){
    volume = parseInt(volume)
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

    this.value = volume
    if(update == "yes"){
      GUI.change_value({variable: this.variable, value: volume})
    }

    return this
  },

  touch_volume: function(y){
    let setbb = this.set.getBBox()
    let setbtm = setbb.y + setbb.height
    let volume = ((setbb.height - (y - setbb.y)) * 127) / setbb.height
    this.set_value(volume)
    return this
  },
  // --

  create: function(paper, record, edit="no"){
    let a = Object.create(GUI.slider_vertical)
      .init(paper, record)

    if(edit == "no"){
      a.drag(
        function(dx, dy, x, y){
          let offset = $('#wrap').offset().top
          a.touch_volume(y - offset)
        },
        function(){},
        function(){}
      )
    }

    else {
      a.drag(
        function(dx, dy){
          if (!a.spos){a.spos = {x:0, y:0}}
          GUI.move_by(a.set, dx-a.spos.x, dy-a.spos.y)
          a.spos = {x:dx, y:dy}
        },
        function(){ a.edit_off() },
        function(){ 
          a.spos = undefined
          a.edit_on(paper)

          GUI.charms.width_ball.drag(
            function(dx, dy){
              let setbb = a.set.getBBox()
              if (!GUI.charms.width_ball.spos){GUI.charms.width_ball.spos = 0}
              GUI.move_by(GUI.charms.width_ball, dx-GUI.charms.width_ball.spos, 0)
              a.width(setbb.width + dx-GUI.charms.width_ball.spos)
              GUI.move_to(
                GUI.charms.height_ball, 
                setbb.x + setbb.width/2 - 20,
                setbb.y + setbb.height - 20
              )
              GUI.charms.width_ball.spos = dx
            },
            function(){},
            function(){ GUI.charms.width_ball.spos = undefined }
          )

          GUI.charms.height_ball.drag(
            function(dx, dy){
              let setbb = a.set.getBBox()
              if (!GUI.charms.height_ball.spos){GUI.charms.height_ball.spos = 0}
              GUI.move_by(GUI.charms.height_ball, 0, dy-GUI.charms.height_ball.spos)
              a.height(setbb.height + dy-GUI.charms.height_ball.spos)
              GUI.move_to(
                GUI.charms.width_ball, 
                setbb.x + setbb.width - 20,
                setbb.y + setbb.height/2 -20
              )
              GUI.charms.height_ball.spos = dy
            },
            function(){},
            function(){ GUI.charms.height_ball.spos = undefined }
          )

        }
      )
    }
    return a
  }

})
