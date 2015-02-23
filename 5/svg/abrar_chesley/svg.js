// Warning: this code is atrocious
// FIXME: needs comments
var svg = document.getElementById("s");
var svgContainer = document.getElementById("container");
var HUD = document.getElementById("HUD");
var HORIZONTAL_PADDING = 20;
var FIELD_SIZE_MULTIPLIER = 44;
var CONTAINER_LEFT_OFFSET = 10;
var CONTAINER_TOP_OFFSET = 22;
var VERTICAL_SCROLL_THRESHOLD = 20;
var zoom_scale = 1.0;
var translate_x = 0;
var translate_y = 0;
var isDragging = false;
var startX = 0;
var startY = 0;
var csv = [[]];
var groups = [];

var init = function() {
    zoom_scale = 1.0;
    translate_x = 0;
    translate_y = 0;
    isDragging = false;
    startX = 0;
    startY = 0;
    csv = [[]];
    groups = [];
    for (var i = 0; i < svgContainer.childNodes.length; ++i) {
        svgContainer.removeChild(svgContainer.childNodes[i]);
    }
    svgContainer.setAttribute("transform", "");
}

var trim = function(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

var parseCSV = function(e) {
    init();
    var s = trim(document.getElementById("textarea").value);
    var inQuote = false;
    var row = 0;
    var col = 0;
    var start = 0;
    for (var i = 0; i < s.length; ++i) {
        var current = s[i];
        if (!csv[row]) {
            csv[row] = [];
        }
        if (current == '"') {
            inQuote = !inQuote;
            continue;
        }
        if (current == ',' && !inQuote) {
            csv[row].push(s.substring(start, i));
            start = i + 1;
            ++col;
            continue;
        }
        if (current == '\n' && !inQuote) {
            csv[row].push(s.substring(start, i));
            start = i + 1;
            ++row;
            continue;
        }
    }
    // Add last data value
    if (!csv[row]) {
        csv[row] = [];
    }
    csv[row].push(s.substring(start, i));
    generateSVG();
}

var generateSVG = function() {
    var prev = addData(csv[0][0], 0, 0, 0, 0, 0);
    var headerWidth = prev.getBBox().width + HORIZONTAL_PADDING;
    for (var row = 1; row < csv.length; ++row) {
        addData(csv[row][0], 0, row * FIELD_SIZE_MULTIPLIER, headerWidth, row, 0);
    }
    for (var col = 1; col < csv[0].length; ++col) {
        var offsetX = parseInt(prev.getAttribute("x")) + prev.getBBox().width + (HORIZONTAL_PADDING / 2);
        prev = addData(csv[0][col], offsetX, 0, 0, 0, col);
        var headerWidth = prev.getBBox().width + HORIZONTAL_PADDING;
        for (var row = 1; row < csv.length; ++row) {
            addData(csv[row][col], offsetX, row * FIELD_SIZE_MULTIPLIER, headerWidth, row, col);
        }
    }
    render();
}

var addData = function(s, x, y, w, row, col) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    t.setAttribute("x", x + CONTAINER_LEFT_OFFSET);
    t.setAttribute("y", y + CONTAINER_TOP_OFFSET);
    t.setAttribute("stroke", "#660000");
    t.setAttribute("fill", "#660000");
    t.innerHTML = s;
    t.addEventListener("mouseover", updateHUD);
    t.row = row;
    t.col = col;
    r.setAttribute("width", w);
    r.setAttribute("stroke", "#111111");
    r.setAttribute("fill", "#00D7AF");
    g.appendChild(r);
    g.appendChild(t);
    groups.push(g);
    svgContainer.appendChild(g);
    return t;
}

var render = function() {
    var headerWidth = 0;
    for (var i = 0;i < groups.length; ++i) {
        var rect = groups[i].childNodes[0];
        var text = groups[i].childNodes[1];
        var textBB = text.getBBox();
        rect.setAttribute("x", parseInt(text.getAttribute("x")) - (HORIZONTAL_PADDING / 2));
        rect.setAttribute("y", text.getAttribute("y") - textBB.height);
        rect.setAttribute("height", textBB.height * 2);
        // width attribute is 0 for table headers
        if (rect.getAttribute("width") === "0") {
            headerWidth = textBB.width + HORIZONTAL_PADDING;
            rect.setAttribute("width", headerWidth);
        }
        else {
            if (textBB.width > 0) {
                var transformScale = headerWidth / (textBB.width + HORIZONTAL_PADDING);
                var x = -1 * (transformScale - 1) * parseFloat(rect.getAttribute("x"));
                var y = -1 * (transformScale - 1) * parseFloat(rect.getAttribute("y"));
                text.setAttribute("transform", "matrix(" + transformScale + ", 0, 0, 1, " + x + ", 0 )");
            }
        }
    }
}

var applyTransform = function() {
    if (csv.length > 1) {
        var scale = "scale(";
        scale += zoom_scale + ")";
        if (Math.abs(translate_y) < VERTICAL_SCROLL_THRESHOLD) {
            translate_y = 0;
        }
        var translate = "translate(" + translate_x + ", " + translate_y + ")";
        svgContainer.setAttribute("transform", scale + ", " + translate);
    }
}

var resize = function(delta) {
    if (csv.length > 1) {
        if (delta > 0) {
            zoom_scale += 0.05;
        }
        else if (delta < 0) {
            zoom_scale -= 0.05;
        }
        applyTransform();
    }
}

var translate = function(dx, dy) {
    if (csv.length > 1) {
        translate_x += (dx * 1 / zoom_scale);
        translate_y += (dy * 1 / zoom_scale);
        applyTransform();
    }
}

var scrollHandler = function(e) {
    e.preventDefault();
    var delta = e.wheelDelta || -e.detail;
    resize(delta);
}

var startDragHandler = function(e) {
    isDragging = true;
    svg.style.cursor = 'move';
    startX = e.clientX;
    startY = e.clientY;
    e.preventDefault();
}

var stopDragHandler = function(e) {
    isDragging = false;
    svg.style.cursor = 'default';
    translate(e.clientX - startX, e.clientY - startY);
    e.preventDefault();
}

var updateHUD = function(e) {
    var target = e.target;
    var colName = csv[0][target.col];
    HUD.innerHTML = "<b>(" + target.row + ", " + colName + ")</b><br/>" + target.innerHTML;
}

var exportSVG = function() {
    /*
        Credits to user defghi1977 at stackoverflow.com for this method
        (http://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an)
    */

    // Get SVG source
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);
    // Add name spaces
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    // Add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    // Convert SVG source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    // Generate link
    var link = document.getElementById("link");
    link.href = url;
    link.style.visibility = "visible";
}

//var dragHandler = function(e) {
//    if (isDragging) {
//        var x = e.clientX;
//        var y = e.clientY;
//        console.log(x + ", " + y);
//    }
//}

document.getElementById("submit").addEventListener("click", parseCSV);
document.getElementById("export").addEventListener("click", exportSVG);
svg.addEventListener("mousewheel", scrollHandler, false);
svg.addEventListener("mousedown", startDragHandler, false);
svg.addEventListener("mouseup", stopDragHandler, false);
//svg.addEventListener("mousemove", dragHandler, false);

render();
