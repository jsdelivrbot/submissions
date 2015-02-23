


var vs = document.getElementById("vs");
vs.innerHTML="Turn your creative writing into ABSRACT ART! Just start typing.";
var key = document.getElementById("key");
key.innerHTML="Nothing pressed yet";

var svg = document.getElementById("s");


/*var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
c1.setAttribute('cx',300);
c1.setAttribute('cy',100);
c1.setAttribute('r',50);
c1.setAttribute('fill',"#00ff25");
svg.appendChild(c1);*/


var inc=-1;



var action = function(e) {
	code=e.keyCode;
	charcode=e.charcode;
	e.preventDefault();
	
	var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
	c1.setAttribute('cy',code * 2);
	c1.setAttribute('cx',((inc*513)%200) * 2);
	c1.setAttribute('r',code);
	if ((inc%2)==0){
		c1.setAttribute('fill',"#"+(code*13)%100+"ff"+(code*inc)%100);
	}
	else{
		c1.setAttribute('fill',"#"+(code*13)%100+"cc"+(code*inc)%100);
	}
	svg.appendChild(c1);
	inc++;
	
	
	key.innerHTML=code;


	//Apologies for the waste below. I'm paranoid about throwing away code.


	//vs.innerHTML="testing2";
	/*if (inc==0){
		//vs.innerHTML="testing1";
		
		/c1.setAttribute('cx',300);
		c1.setAttribute('cy',100);
		c1.setAttribute('r',50);
		c1.setAttribute('fill',"#00ff25");/
	}
	if (inc==1){
		//vs.innerHTML="testing3";
		c1.setAttribute('cx',code * 2);
	}
	if (inc==2){
		//vs.innerHTML="testing4";
		c1.setAttribute('cy',code * 2);
	}
	if (inc==3){
		//vs.innerHTML="testing5";
		c1.setAttribute('r',code);
	}
	if (inc==4){
		//vs.innerHTML="testing6";
		c1.setAttribute('fill',"#00ff"+code);
		svg.appendChild(c1);
	} */
	
	/*if (code==65){
	//	var x = parseFloat(isaac.getAttribute('cx'));
	//	isaac.setAttribute('cx',x-5);
	//}
	//if (code==68){
	//	var x = parseFloat(isaac.getAttribute('cx'));
	//	isaac.setAttribute('cx',x+5);
	//}
	//if (code==87){
		var y = parseFloat(isaac.getAttribute('cy'));
		isaac.setAttribute('cy',y-5);
	}
	if (code==83){
		var y = parseFloat(isaac.getAttribute('cy'));
		isaac.setAttribute('cy',y+5);
	}*/
	
	//vs.innerHTML=inc;
};



//var isaac = document.getElementById("isaac");
document.addEventListener("keydown",action);

