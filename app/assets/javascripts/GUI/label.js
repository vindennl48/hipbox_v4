GUI.add_component({
  // REQUIRED
  ctype: 'label',              // primary key in component table
  name:  'Label',              // display name

  // REQUIRED
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

  // REQUIRED
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
      "variable":  'Label',
      "value":     ''
    }
  },

  // Size & Position
  // REQUIRED
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
  // REQUIRED
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
      a.set_value(a.value)
      a.set_color(a.color)
    }
    let btn_destroy = function(){
      if(confirm('Are you sure you want to remove this item?'))
        a.destroy()
    }
    $("#btn_save_item_prop").unbind('click').click(btn_save)
    $("#btn_destroy_item_prop").unbind('click').click(btn_destroy)
  },

  set_color: function(color){
    this.color = color
    this.body.attr('fill', this.color)
  },

  // REQUIRED
  get_layout_info: function(){
    if(this.remove_me)
      return {
        "id": this.id,
        "remove": true
      }
    else
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

  // REQUIRED
  get_value_info: function(){
    return {
      "id":    this.id,
      "value": 0.0
    }
  },

  // Component Specific
  // REQUIRED
  set_value: function(value='', update="yes"){
    this.body.attr('text', value)
    this.value = value
    return this
  },
  // --

  // REQUIRED
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
          a.activate_prop_modal()
          let selector = GUI.add_to_charm_list(
            'selector',
            a.paper.rect(a.x(), a.y() + a.height(), a.width(), 10, 0)
              .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})
          )
        }
      )
    }
    return a
  }, 

  // REQUIRED
  destroy: function(){
    // remove all raphaeljs elements from paper
    this.body.remove()

    // remove any charms
    GUI.clear_charms()

    // re-hide the item property page
    $("#link_item_prop").prop('hidden', true)

    // flag for removal from database
    this.remove_me = true
  }

})
