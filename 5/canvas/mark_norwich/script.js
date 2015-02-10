var canvas;
var context;

function drawImage2(imageObj){

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	var imageWidth = imageObj.width;
	var imageHeight = imageObj.height;

	$('#myCanvas').attr('height', imageHeight).attr('width', imageWidth);
	context.drawImage(imageObj, 0, 0, imageWidth, imageHeight);
	var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
	var data = imageData.data;
 
	 
	 var pixels = [];
	 var count = 0;
	 for(var i = 0; i < data.length; i++){
		var pixel = { r: 0, b: 0, g: 0 };
		pixel.r = data[i];
		i++;
		pixel.b = data[i];
		i++;
		pixel.g = data[i];
		i++
		pixels.push(pixel);
	 }
	 
	 
	var pallette = ['@','8','0','G','C','L','f','t','1','i','+',';',":",',','.'];

   
	var range = 255 / pallette.length;
	var output = '';
	for(var y = 0; y < imageHeight; y++){
		for(var x = 0; x < imageWidth; x++) {
			var colorSat = 0; 
			var pixel = pixels[imageWidth * y + x];
			colorSat += Math.sqrt((Math.pow(pixel.r, 2) * 0.241) + (Math.pow(pixel.g, 2) * 0.691) + (Math.pow(pixel.b, 2) *0.068)); 
			output += pallette[Math.floor(colorSat/range)] + " ";
		}
	    output+="\n";
	}
	$('pre').text(output);
  
}

	




var imageObj = new Image();
imageObj.onload = function() {
    drawImage2(this);
};

$('document').ready(function(){
	var imageLoader = document.getElementById('imageLoader');
    	imageLoader.addEventListener('change', handleImage, false);

    $('#Painting').change(function(){	
		imageObj.width = 800;
		var paint = $('#Painting').val(); 
		imageObj.src = paint
		title = paint.split('.')
		$('#header').text(title[0]) 
    });  
}); 
    
  
  
function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        imageObj.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);    
     $('#header').text(" ") 
}









