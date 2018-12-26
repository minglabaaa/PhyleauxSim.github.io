function showValueAppendScale(val){
    			document.getElementById("brl").innerHTML=val;
				appendScale(val);
    		}
    		
    		function appendScale(val){
				var plotSvg = d3.select("#histories")
								.append("svg")
								.attr("width",800)
    							.attr("height",20);
    			plotSvg.append("line")
    				   .attr("x1",0)
    				   .attr("x2",800)
    				   .attr("y1",19)
    				   .attr("y2",19)
    				   .attr("stroke","black")
    				   .attr("stroke-width",2);
    			plotSvg.append("line")
    				   .attr("x1",1)
    				   .attr("x2",1)
    				   .attr("y1",20)
    				   .attr("y2",15)
    				   .attr("stroke","black")
    				   .attr("stroke-width",2);
    			plotSvg.append("line")
    				   .attr("x1",800-1)
    				   .attr("x2",800-1)
    				   .attr("y1",20)
    				   .attr("y2",15)
    				   .attr("stroke","black")
    				   .attr("stroke-width",2);
				plotSvg.append("text")
					   .attr("fill","black")
					   .attr("x",0)
					   .attr("text-anchor","start")
					   .attr("font-size","14px")
					   .attr("y",10)
					   .text("0.0");
				plotSvg.append("text")
					   .attr("fill","black")
					   .attr("x",800)
					   .attr("text-anchor","end")
					   .attr("font-size","14px")
					   .attr("y",10)
					   .text(val);
				d3.select("#histories").append("br");
    		}

    var myModel = new Model(bf=[0.25,0.25,0.25,0.25],
                                    rates=[1,1,1,1,1,1],
                                    gammaRates=true,
                                    alpha=10,
                                    invSites=false,
                                    i=0);
            
            var myCharHistory = new characterHistory(model=myModel);
    
            var startState = null;
            function fixStartState(){
                if (document.getElementById("fixStart").checked === true){
                    startState = "A";
                } else {
                    startState = null;
                }
            }
            fixStartState();
    
            var show = true;
            function showCharStates(){
                if (document.getElementById("showStates").checked === true){
                    show = true;
                } else {
                    show = false;
                }
            }
    
            d3.select("#clearCharHists").on("click",function(){
                d3.select("#histories").selectAll("svg").remove();
                d3.select("#histories").selectAll("br").remove();
                var brl = parseFloat(d3.select("#brlSlider").property("value"));
                appendScale(brl);
            });
            
            
            d3.select("#drawCharHist").on("click",function(){
                var brl = parseFloat(d3.select("#brlSlider").property("value"));
                myCharHistory.sampleHistory(brl,startState);
                var plotSvg = d3.select("#histories").append("svg");
                myCharHistory.drawHistory(brl,w=800,h=30,svg=plotSvg,showStates=show);
                plotSvg.datum([myCharHistory.states,myCharHistory.waitingTimes]);
                
                plotSvg.on("mouseover",function(d){
                        d3.select("#tooltip")
                          .style("left",d3.event.clientX + "px")
                          .style("top",d3.event.clientY + "px");
                    if (d[0].length === 1){
                        d3.select("#tooltip")
                          .select("#value")
                          .append("p")
                          .text("No character changes.")
                    }
                    for (var i = 0; i < d[0].length-1; i++){
                        d3.select("#tooltip")
                          .select("#value")
                          .append("p")
                          .text(d[0][i] + " -> " + d[0][i+1] + "  (" + parseFloat(d[1][i]).toFixed(4) + ")");
                    }
                    d3.select("#tooltip").classed("hidden", false);
                })
                
                plotSvg.on("mouseout",function(){
                    //Hide the tooltip
                    d3.select("#tooltip").classed("hidden", true);
                    d3.select("#tooltip").select("#value").selectAll("p").remove();
                })
                
                d3.select("#histories").append("br");
                
            });
            

        d3.select("#brlSlider").property("value",1.0);
            showValueAppendScale(1.0);
    		
