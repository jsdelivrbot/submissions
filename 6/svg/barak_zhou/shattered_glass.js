var svgSurface = document.getElementById("svg");

/*
var polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline");
polyline.setAttribute("points","10,100 122,500 238,12");
polyline.setAttribute("fill","none");
polyline.setAttribute("stroke","white");
polyline.setAttribute("stroke-width","5");
polyline.setAttribute("stroke-opacity","0.5");

svgSurface.appendChild(polyline);
*/

var circleRadius = 12;
var numFractures = 40;
var deviations = 2;
var devLength = 60;
var devChance = 0.8;

var shatter = function(e) {
    //console.log(e.pageX);
    //console.log(e.pageY);
    //midpoint: e.pageX, e.pageY
    var initPoints = [];
    for (var i=0;i<numFractures;i++) {
	var angle = Math.random() * Math.PI * 2;
	var x = Math.cos(angle) * circleRadius + e.pageX - 10; //I can't think of a better way to do this
	var y = Math.sin(angle) * circleRadius + e.pageY - 77;
	initPoints.push(["",angle, [x,y]]);
    }
    //console.log(initPoints);
    for (var i=0;i<initPoints.length;i++) {
	var point = initPoints[i];
	point.push([point[2][0] + Math.cos(point[1]) * (devLength), point[2][1] + Math.sin(point[1]) * (devLength)]); 
    }
    //console.log(initPoints);
    for (var i=0;i<initPoints.length;i++) {
	var point = initPoints[i];
	point[1] = point[1] + Math.random();
	point.push([point[3][0] + Math.cos(point[1]) * (devLength + 200 + 300 * Math.random()), point[3][1] + Math.sin(point[1]) * (devLength + 200 + 300 * Math.random())]); 
    }
    
    //sort
    initPoints.sort(function(a,b){return a[1] < b[1]});

    //polyline constructor(s)
    for (var i=0;i<initPoints.length;i++) {
	var point = initPoints[i];
	point[0] += point[2][0] + "," + point[2][1] + " " + point[3][0] + "," + point[3][1] + " ";
	//console.log(point[0]);
	
	var polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline");
	polyline.setAttribute("points",point[0]);
	polyline.setAttribute("fill","none");
	polyline.setAttribute("stroke","white");
	polyline.setAttribute("stroke-width","3");
	polyline.setAttribute("stroke-opacity","" + (Math.random() - 0.3));

	svgSurface.appendChild(polyline);
    }
    
    for (var i=0;i<initPoints.length-1;i++) {
	if (Math.random() < devChance) {
	    var point = initPoints[i];
	    var flag = point[3][0] + "," + point[3][1] + " " + initPoints[i+1][3][0] + "," + initPoints[i+1][3][1] + " ";
	    var polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline");
	    polyline.setAttribute("points",flag);
	    polyline.setAttribute("fill","none");
	    polyline.setAttribute("stroke","white");
	    polyline.setAttribute("stroke-width","3");
	    polyline.setAttribute("stroke-opacity","" + (Math.random() - 0.3));
	    
	    svgSurface.appendChild(polyline);
	    
	}
    }
    
    for (var i=0;i<initPoints.length;i++) {
	var point = initPoints[i];
	point[0] = point[3][0] + "," + point[3][1] + " " + point[4][0] + "," + point[4][1] + " ";
	//console.log(point[0]);
	
	var polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline");
	polyline.setAttribute("points",point[0]);
	polyline.setAttribute("fill","none");
	polyline.setAttribute("stroke","white");
	polyline.setAttribute("stroke-width","3");
	polyline.setAttribute("stroke-opacity","" + (Math.random() - 0.3));

	svgSurface.appendChild(polyline);
    }
};

//click?
svgSurface.addEventListener("mousedown", shatter);

