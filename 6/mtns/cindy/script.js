var mtn = [80,20,25,75,90,100,570,80,10,110,5,900,9000,20,50];

var x = _.chain(mtn)
    .map( function(val, i) {
	return Math.abs( mtn[i+1] - val );
    } )
    .filter( function(val) {
	return val >= 30;
    } )
    .value();
    
console.log(x);
console.log(x.length)
