var addCircle = function(s,x,y,r,c) {
    //var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    //c1.setAttribute('cx',x);
    //c1.setAttribute('cy',y);
    //c1.setAttribute('r',r);
    //c1.setAttribute('fill',c);
    //c1.addEventListener('click',cClicked);
    //s.appendChild(c1);
    
};

var dist = function(a,b){
	return Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2));
}

var closestPtIndex = function(pt, ls) { //index of closest point in ls to pt
	var md = 100000000;
	var mi = -1;
	//console.log('lslength', ls.length);
	for (var i=0; i < ls.length-1; i++){
		var td = dist(pt, ls[i]);
		if (td <= md){
			md = td;
			mi = i;
		}
	}
	return mi;
}

var move = function(){
	var wr = 25;
	for (var i = 0; i < ctr.length; i++){
		ctr[i][0] = ctr[i][0] + Math.random()*wr-wr/2.0;
		ctr[i][1] = ctr[i][1] + Math.random()*wr-wr/2.0;
	}
	updatePath();
}

//not complete
var closePtIndex = function(pt, ls, md) { //index of close points in ls to pt
	var up = [];
	var ud = [];
	//console.log('lslength', ls.length);
	for (var i=0; i < ls.length-1; i++){
		var td = dist(pt, ls[i]);
		if (td <= md){
			
		}
	}
	return mi;
}


var addToPath = function(ind, pt){ //closest index, coor of new pt
	var ctrind1 = -1;
	if (ind==0){
		ctrind1 = ctr.length-1;
	}else{
		ctrind1 = ind-1;
	}
	var ctrind2 = ind;
	var sp1x = (pts[ind][0] + ctr[ctrind1][0])/2.0;
	var sp1y = (pts[ind][1] + ctr[ctrind1][1])/2.0;
	
	var sp2x = (pts[ind][0] + ctr[ctrind2][0])/2.0;
	var sp2y = (pts[ind][1] + ctr[ctrind2][1])/2.0;
	
	var cp1x = (pt[0] + ctr[ctrind1][0])/2.0;
	var cp1y = (pt[1] + ctr[ctrind1][1])/2.0;
	
	var cp2x = (pt[0] + ctr[ctrind2][0])/2.0;
	var cp2y = (pt[1] + ctr[ctrind2][1])/2.0;
	
	//console.log('pt',pt);
	//console.log('ctrind',ctrind1,ctrind2);
	//console.log('sp1',[sp1x, sp1y]);
	//console.log('sp2',[sp2x, sp2y]);
	//console.log('pt',pt);
	//console.log('cp1',[cp1x, cp1y]);
	//console.log('cp2',[cp2x, cp2y]);
	//console.log('lni',pts.length,ctr.length);
	
	pts[ind] = [sp1x, sp1y];
	pts.splice(ind+1, 0, pt);
	pts.splice(ind+2, 0, [sp2x, sp2y]);
	
	ctr.splice(ind, 0, [cp1x, cp1y]);
	ctr.splice(ind+1, 0, [cp2x, cp2y]);
	
	//console.log('lnf',pts.length,ctr.length);
}


var pts = []
var ctr = []

var createString = function(){
	var rt = "M "+pts[0][0].toString() + " " + pts[0][1].toString();
	for(var i = 1; i < pts.length; i++){
		rt = rt + 
		" Q " + ctr[i-1][0].toString() + " " + ctr[i-1][1].toString() +
		 " " + pts[i][0].toString() + " " + pts[i][1].toString();
	}
	//console.log(rt);
	return rt;
}

var updatePath = function(){
	pt = createString();
	pto = document.getElementById('blot');
	pto.setAttribute('d', pt);
}

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    console.log("clicked");
	
	var x = e.pageX;
	var y = e.pageY;
	var w = 100;
    if (pts.length==0){
		var p1 = [x-w, y];
		var p2 = [x+w,y];
		var c1 = [x, y+2*w];
		var c2 = [x, y-2*w];
		pts.push(p1);
		pts.push(p2);
		pts.push(p1);
		ctr.push(c1);
		ctr.push(c2);
		updatePath();
		go();
	}else{
		var ind = closestPtIndex([x,y], pts);
		console.log('ind',ind);
		addToPath(ind, [x,y]);
		updatePath();
	}
};
var t = 0;
var go = function() {
	console.log('go');
	t = setInterval(move,100);
};

var s = document.getElementById("s");
s.addEventListener('click',clicked);
