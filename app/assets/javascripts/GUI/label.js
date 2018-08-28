GUI.add_component({
  ctype: 'label',              // primary key in component table
  name:  'Label',              // display name

  init: function(paper, record){
    // Component Variables
    this.paper     = paper               // raphaeljs paper
    this.id        = record['id']        // primary key in component table
    this.color     = record['color']     // base color value
    this.extra     = record['extra']     // anything extra needed
    this.variable  = ''                  // midi note variable
    this.value     = record['variable']  // saved value
    this.layout_id = record['layout_id'] // saved value
    // --

    // RaphaelJS Items
    // temporary defaults
    let x = 50, y = 50

    this.body = paper.text(x, y, this.value)
      .attr({fill:this.color, 'font-size':30})
    // --

    // Container to hold all the pieces
    this.set = paper.set()
      .push(this.body)
    // --

    // Move into position and resize
    this.x(record['x'])
    this.y(record['y'])
    this.width(record['width'])
    this.height(record['height'])
    // --

    return this
  },

  reload: function(paper, record){
    this.remove()
    this.init(paper, record)
    return this
  },

  default_values: function(layout_id){
    return {
      "id":        undefined,
      "ctype":     this.ctype,
      "x":         50,
      "y":         50,
      "width":     100,
      "height":    22.5,
      "color":     '#fcfdff',
      "extra":     {},
      "layout_id": layout_id,
      "variable":  '',
      "value":     'Label'
    }
  },

  // Size & Position
  x: function(x){ 
    if(x == undefined){ return this.body.getBBox().x }
    else{ GUI.move_to(this.set, x, this.y()); return this }
  },
  y: function(y){ 
    if(y == undefined){ return this.body.getBBox().y }
    else{ GUI.move_to(this.set, this.x(), y); return this }
  },
  width: function(width){
    if(width == undefined)
      return this.body.getBBox().width 
    else
      return this 
  },

  height: function(height){
    if(height == undefined)
      return this.body.getBBox().height 
    else
      return this
  },

  drag: function(a, b, c){
    this.set.drag(a, b, c)
    return this
  },
  // --

  // Layout saving, changing, etc.
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
      "variable":  this.value,
      "value":     0.0
    }
  },

  get_value_info: function(){
    return {
      "id":    this.id,
      "value": 0.0
    }
  },

  remove: function(){
    this.body.remove()
  },

  // Component Specific
  set_value: function(value='', update="yes"){
    this.body.attr('text', value)
    this.value = value
    return this
  },

  activate_prop_modal: function(){
    $("#link_item_prop").prop('hidden', false)
    $("#text_field_variable").attr('placeholder', 'text')
    $("#span_variable").text('Text: ')
    $("#text_field_variable").val(this.value)
    $("#text_field_color").val(this.color)
    let a = this
    let btn_save = function(){
      a.value = $("#text_field_variable").val()
      a.color = $("#text_field_color").val()
      //a.reload(GUI.paper, a.get_layout_info()).edit_on()
      a.set_value(a.value)
      a.body.attr('fill', a.color)
    }
    $("#btn_save_item_prop").unbind('click').click(btn_save)
  },

  edit_on: function(){
    GUI.clear_charms() 
    this.activate_prop_modal()
    let selector = GUI.add_to_charm_list(
      'selector',
      this.paper.rect(this.x(), this.y() + this.height(), this.width(), 10, 0)
        .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})
    )
  },
  // --

  create: function(paper, record, edit="no"){
    let a = Object.create(GUI.label)
      .init(paper, record)

    if(edit != "no") {
      a.drag(
        function(dx, dy){
          if (!a.spos){a.spos = {x:a.x(), y:a.y()}}
          GUI.move_to(a.set, GUI.snap(dx+a.spos.x), GUI.snap(dy+a.spos.y))
        },
        function(){ GUI.clear_charms() },
        function(){
          a.spos = undefined
          a.edit_on()
        }
      )
    }
    return a
  }

})
