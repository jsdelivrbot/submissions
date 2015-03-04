// console.log(mountains)
// console.log(diff)
// console.log(ans)

var get_mountains = function(mountains, diff) {
    return _.filter(mountains, function(item, index, list) {
        return (Math.abs(item - list[index + 1]) >= diff ||
                Math.abs(item - list[index - 1]) >= diff)
    });
};

console.log("got:     ", get_mountains(mountains, diff));
console.log("ans ind: ", ans);
console.log("ans val: ", _.at(mountains, ans));
