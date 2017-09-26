var w = window.innerWidth /1.7,
        h = window.innerHeight/1.7,
        margin = { top: 70, right: 70, bottom: 40, left: 70 },
        radius = 3;

    var svg2 = d3.select("#graph_2").attr({
        width: w,
        height: h
      });

    // g = svg2.append("g");

    var x = d3.scale.linear()
        .range([margin.left, w - margin.right]);

    var y = d3.scale.linear()
        .range([h - margin.top, margin.bottom ]);

    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });


    d3.csv("/assets/SVD_compress/vis_bk/compress.csv", function(d) {
      d.x = parseInt(d['SVD_K']);
      d.y = parseFloat(d['compression_ratio']);
      // console.log(d['SVD_K'], d['compression_ratio'])
      return d;
    }, function(error, data) {

      if (error) throw error;

      console.log(data);

      x.domain(d3.extent(data, function(d) { return d.x; }));
      y.domain(d3.extent(data, function(d) { return d.y; }));


      var xAxis = d3.svg.axis().scale(x).orient("top");
      var yAxis = d3.svg.axis().scale(y).orient("left");

      svg2.append("g").attr({
        "class": "axis",  // Give class so we can style it
        transform: "translate(" + [0, h -margin.top/2] + ")"  
      }).call(xAxis)

      svg2.append("g").attr({
        "class": "axis",
        transform: "translate(" + [margin.left, 0] + ")"
      }).call(yAxis);  

      svg2.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (margin.left/2) +","+(h/2)+")rotate(-90)")
            .text("Compression Ratio");

      svg2.append("text")
            .attr("text-anchor", "middle") 
            .attr("transform", "translate("+ (w/2) +","+(h-(margin.bottom/3))+")") 
            .text("SVD [K]");


      svg2.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);

       var circleAttrs = {
            cx: function(d) { return x(d.x); },
            cy: function(d) { return y(d.y); },
            r: radius
        };

        svg2.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr(circleAttrs) 
            .on("mouseover", handleMouseOver2)
            .on("mouseout", handleMouseOut2);
    });



      // Create Event Handlers for mouse
      function handleMouseOver2(d, i) {  // Add interactivity

            document.getElementById('recn_2').src = '/assets/SVD_compress/vis_bk/img/svd_R_K_'+d.x+'.png'
            document.getElementById('diff_2').src = '/assets/SVD_compress/vis_bk/img/svd_D_K_'+d.x+'.png'
            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "orange",
              r: radius * 2
            });

            // Specify where to put label of text
            text = svg2.append("text").attr({
               id: "t" + d.x + i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return x(d.x) - 30; },
                y: function() { return y(d.y) - 45; },
                'fill' : "orange",
                "font-size" : 12,
                'font-weight' : 'bolder'
            })
            text.append("tspan").attr({'x': x(d.x)-30, 'dy' : 15}).text('K  = '+d.x)
            text.append("tspan").attr({'x': x(d.x)-30, 'dy' : 15}).text('CR = '+d.y.toFixed(2))
            // .text(function() {
            //   return  "K  = "+d.x+' || '+"CR = "+d.y.toPrecision(3)
            //   [d.x, d.y];  // Value of the text
            // });

          }

      function handleMouseOut2(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "black",
              r: radius
            });

            // Select text by id and then remove
            d3.select("#t" + d.x + i).remove();  // Remove text location

            document.getElementById('recn_2').src = '/assets/SVD_compress/vis_bk/none.png'
            document.getElementById('diff_2').src = '/assets/SVD_compress/vis_bk/none.png'
          }
