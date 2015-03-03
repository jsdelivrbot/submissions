var mountains = [10,20,35,25,60,70,15];

var range = function(mtn) { 
   return _.filter(mtn,function(num,i,r){
       return Math.abs(r[i+1]-num);}).length
}
console.log(range(mountains));
    
