var data = json["data"];
var a = [];
for (var i=0; i<data.length; i++) {
    var d = {};
    d["code"] = data[i][8];
    d["name"] = data[i][9];
    d["num"] = data[i][10];
    d["r"] = data[i][11];
    d["m"] = data[i][12];
    d["w"] = data[i][13];
    console.log(d);
    a.push(d);
}
    
