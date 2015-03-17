rawschools = rawdata.data

var map = function(list, func) {
    var result = [];
    for (var i=0; i<list.length; i++) {
	result.push(func(list[i]));
    };

    return result;
};

var filter = function(list, func) {
    var result = [];
    for (var i=0; i<list.length;i++) {
	if (func(list[i])) {
	    result.push(list[i]);
	};
    };

    return result;
};

var reduce = function(list, func, init) {
    var result = init;
    for (var i=0; i<list.length; i++) {
	result = func(list[i], result);
	};

    return result;
};

//Array of dictionaries
scores = map(rawschools, function(item) {
    return {
	code : item[8],
	name : item[9],
	num : item[10],
	eng : item[11],
	math : item[12],
	writing : item[13],
    }
});
console.log(scores);

//List of all math scores
math_scores = filter(
    map(
	map(scores,function(item) {return item.math;}),
	function(item) {return parseInt(item);}
    ),
    function(item) {return !isNaN(item);}
);
    
console.log(math_scores);
		  
//Mean of math scores
math_sum = reduce(math_scores, function(x,y) {return x+y;}, 0);
math_mean = math_sum/math_scores.length;

console.log(math_mean);
//New dictionary with math score > math average

high_scores = filter(scores, function(item) {
    return (!isNaN(parseInt(item.math))) && parseInt(item.math) > math_mean;
});

console.log(high_scores);
s = reduce(
    map(
	high_scores,
	function(item) {return item.name;}
    ),
    function(x,y) {
	return y+"<li>"+x+"</li>";
    },
    "<ul>"
);

s += "</ul>";
console.log(s);
window.onload = function() {
    x = document.getElementById("content");
    x.innerHTML=math_mean;
    document.getElementById("schools").innerHTML = s;
}
