let GUI = {

  slider_vertical: function(paper, color){
    // body
    paper.rect(5, 5, 60, 300, 5)
      .attr({fill:'black', 'stroke-width':3, stroke:color})

    // volume filler
    paper.rect(5, 155, 60, 150, 5)
      .attr({fill:'#424242', 'stroke-width':3, stroke:color})

    // handle
    paper.rect(5, 155, 60, 10, 3)
      .attr({fill:color, 'stroke-width':0})
  }

}
