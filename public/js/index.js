var drawing = document.getElementById("drawing");
var num = document.getElementById("num");
var pImg = document.getElementById("pImg");
var main = document.getElementById("main");
var ctx = drawing.getContext("2d");
var mainH = document.body.offsetHeight - main.offsetHeight;//输出图片最大的尺寸范围
var mainW =  main.offsetWidth;

var dropFiles = function (event)
{
	event.preventDefault();
	if(event.type == "drop")
	{
		files = event.dataTransfer.files;
		var img = files[0];
		if(!img)
			return;
		var type = img.type;//图片类型
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
				var w = drawing.width = uImg.width;//图片的原始尺寸
				var h = drawing.height = uImg.height;
				ctx.drawImage(uImg, 0, 0, w, h);
				ctx.fillStyle = "red";
				var size = w/8;//角标的尺寸，图片的1/8
				var x = w-size;//角标所在图片的x轴
				var y = size;//y轴
				ctx.beginPath();
				ctx.arc(x, y, size, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.fillStyle = "white";
				ctx.font = "bold "+ y +"px Arial";
				ctx.textAlign = "center";
				var value = 1;//角标上的数字
				if(num.value && !isNaN(num.value))
					value = num.value;
				if(num.value>99)
					value = "99+";
				ctx.fillText(value, x, y + y/3);//数字在角标中的位置
				pImg.src = drawing.toDataURL(type);//处理后的图片

				var Proportion = h<w ? h : w ,//图片比例
					ProportionW = w/Proportion,
					ProportionH = h/Proportion;
				while(w >= mainW || h >= mainH)//如果图片较大，按照比例缩放至合适的尺寸
				{
					w-=ProportionW;
					h-=ProportionH;
				}
				pImg.style.width = w;//设置图片的尺寸
				pImg.style.height = h;

			};
		};
	}
}
document.body.addEventListener("dragenter",dropFiles);
document.body.addEventListener("dragover",dropFiles);
document.body.addEventListener("drop",dropFiles);
