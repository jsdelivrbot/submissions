var z = document.getElementById("z");
var c = document.getElementById("c");
var r =c.getAttribute('r');
//console.log(rad)
var svg= document.getElementById("svg");
var walls= document.getElementsByClassName("wall");
var win= document.getElementsByClassName("win");
var finish=document.getElementById("finish");
console.log(walls);
var i=0;
var checkWallCollisions = function(cx,cy){
    var collides=false
    i=0;
    
    /* for(i=0;i<walls.length;i++){
     var wall=walls[i];
     var x= wall.getAttribute("x");
     var y= wall.getAttribute("y");
     var height=wall.getAttribute("height");
     var width = wall.getAttribute("width");
     if ((cy+r < y+height && cy+r > y && cx >x && cx< x+width)){
     console.log("true")
     return true
     }
     }*/
    return false
};

/*var text = document.createElement('text');
text.innerHTML ="HELLO";
text.setAttribute('x',"20");
text.setAttribute('y',"140");
svg.appendChild(text);*/
c.addEventListener("mousemove",function(e){
                   if (!checkWallCollisions(e.offsetX,e.offsetY)){
                   z.setAttribute("x",e.offsetX-25);
                   z.setAttribute("y",e.offsetY-25);
                   c.setAttribute("cx",e.offsetX);
                   c.setAttribute("cy",e.offsetY);
                   }
                   });

finish.addEventListener("mousemove",function(e){
                        win[0].setAttribute("width",'600');
                        win[0].setAttribute("height",'600');
                        win[0].setAttribute('opacity',1);
                        console.log(win[1])
                        win[1].setAttribute('opacity',1);
                        
                        for(i=0;i<walls.length;i++){
                    
                            walls[i].setAttribute("opacity",'0')
                        }
                    });

win[0].addEventListener("click",function(e){
    win[0].setAttribute("width",0);
    win[0].setAttribute("height",0);
    z.setAttribute("x",525);
    z.setAttribute("y",25);
    c.setAttribute("cx",550);
    c.setAttribute("cy",50);
                        for(i=0;i<walls.length;i++){
                        
                        walls[i].setAttribute("opacity",'1')
                        }
                        });