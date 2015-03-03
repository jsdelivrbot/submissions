var mts = [20, 30, 33, 40, 50, 40, 20, 70, 50, 10, 45];

var over = function(data, x){
  // list of differences
  diffs = _.map(data,function(n,key){
      if (key+1 < mts.length) { return Math.abs(n - mts[key+1]); }
  });

  // which differences > x
  filt = _.filter(diffs,function(n){
      return n >= x;
  });

  return filt.length;
};

console.log(over(mts,30));
