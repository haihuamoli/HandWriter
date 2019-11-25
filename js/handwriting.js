var canvasWidth=800;
var canvasHeight=canvasWidth;
var isMouseDown=false;
var lastLoc={x:0,y:0};
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var lastTimestemp=0;
var lastLineWidth=-1;
canvas.width=canvasWidth;
canvas.height=canvasHeight;
drawGrid();
$("#clear_btn").click(function(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	drawGrid();
})

canvas.onmousedown=function(e){
	e.preventDefault();
	isMouseDown=true;
    lastLoc=windowToCanvas(e.clientX,e.clientY);
	lastTimestemp=new Date().getTime();
	//alert(loc.x+','+loc.y);
}


canvas.onmouseup=function(e){
	e.preventDefault();
	isMouseDown=false;
	console.log('mouse up!');
}

canvas.onmouseout=function(e){
	e.preventDefault();
	isMouseDown=false;
	console.log('mouse out!');
}

canvas.onmousemove=function(e){
	e.preventDefault();
	if(isMouseDown){
		//console.log('mouse move!');
		var curLoc=windowToCanvas(e.clientX,e.clientY);
		var s= calcDistance(curLoc,lastLoc);
		var curTimestemp=new Date().getTime();
		var t=curTimestemp-lastTimestemp;
		var lineWidths=calcLineWidth(t,s);
		//draw;
		context.beginPath();
		context.moveTo(lastLoc.x,lastLoc.y);
		context.lineTo(curLoc.x,curLoc.y);
		context.strokeStyle='black';
		context.lineWidth=lineWidths;
		context.lineCap="round";
		context.lineJoin="round";
		context.stroke();
		lastLoc=curLoc;
		lastTimestemp=curTimestemp;
		lastLineWidth=lineWidths;
	}
}
function calcLineWidth(t,s){
	var v=s/t;
	var resultWidth;
	if(v<=0.1){resultWidth=30;}	
	else if(v>=10){resultWidth=1;}
	else{resultWidth=30-(v-0.1)/(10-0.1)*(30-1);}
	if(lastLineWidth==-1)
	return resultWidth;
	return lastLineWidth*2/3+resultWidth*1/3;
 }
function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	return{x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
}

function calcDistance(loc1,loc2){
	return(Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y)));
}

function drawGrid(){
context.save();
context.strokeStyle="rgb(230,11,9)";
context.beginPath();
context.moveTo(3,3);
context.lineTo(canvasWidth-3,3);
context.lineTo(canvasWidth-3,canvasHeight-3);
context.lineTo(3,canvasHeight-3);
context.closePath();
context.lineWidth=6;
context.stroke();
context.moveTo(3,3);
context.lineTo(canvasWidth-3,canvasHeight-3);
context.beginPath();

context.moveTo(canvasWidth,0);
context.lineTo(0,canvasHeight);

context.moveTo(canvasWidth/2,0);
context.lineTo(canvasWidth/2,canvasHeight);

context.moveTo(0,canvasHeight/2);
context.lineTo(canvasWidth,canvasHeight/2);

context.moveTo(0,0);
context.lineTo(canvasWidth,canvasHeight);
context.lineWidth=1;
context.stroke();
context.restore();
}