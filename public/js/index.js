var drawing = document.getElementById("drawing");
var num = document.getElementById("num");
var ctx = drawing.getContext("2d");
var dropFiles = function (event)
{
	event.preventDefault();
	if(event.type == "drop")
	{
		files = event.dataTransfer.files;
		var img = files[0];
		var reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onerror = function(){
			console.log("error");
		};
		reader.onload = function(){
			var result = reader.result;
			var uImg = new Image();
			uImg.src = result;
			uImg.onload = function(){
				var w = drawing.width = uImg.width;
				var h = drawing.height = uImg.height;
				ctx.drawImage(uImg, 0, 0, w, h);
				ctx.fillStyle = "red";
				var size = w/8;
				var x = w-size;
				var y = size;
				ctx.beginPath();
				ctx.arc(x, y, size, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.fillStyle = "white";
				ctx.font = "bold "+ y +"px Arial";
				ctx.textAlign = "center";
				var value = 1;
				if(num.value)
					value = num.value;
				if(num.value>99)
					value = "99+";
				ctx.fillText(value, x, y + y/4);
			};
		};
	}
}
document.body.addEventListener("dragenter",dropFiles);
document.body.addEventListener("dragover",dropFiles);
document.body.addEventListener("drop",dropFiles);