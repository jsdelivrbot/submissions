var elevations = [20,30,33,80,64,60,122,586,51,110,42,52,89,77];


var action = function (cond, list) {
  var ans = _.filter(list, function(val, ind, list) {
    if (ind < list.length - 1){
      if (Math.abs(val-list[ind+1]) > cond) {
        return val;
      }
    }
  });

  return ans.length + ", The Mountains: " + ans;
}


//Iris Checked, Should be six if I can still do arithmatic which is doubtful.
console.log(action(30, elevations));
