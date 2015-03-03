var mtn = [20,30,33,40,50,40,20,70,50,110,45];

/*******************/
/** USING _.chain **/
/*******************/
var L = _.chain(mtn)
// Find altitude differences
	.map(function(item,index, mtn){ return Math.abs(mtn[index+1] - item);})
// Only keep sharp jumps/drops
	.filter(function(item){ return item >= 30;})
	.value();

//console.log(L);
//console.log(L.length);

/************************/
/** USING _.curryRight **/
/************************/
var cmap    = _.curryRight(_.map,2),
    cfilter = _.curryRight(_.filter,2);
var getSteep = _.compose(
    cfilter(function(item){ return item >= 30;}),
    cmap(function(item,index, mtn){ return Math.abs(mtn[index+1] - item);})
);
var M = getSteep(mtn);

//console.log(M);
//console.log(M.length);
