var paintCanvas = document.getElementById("paintCanvas");//для малюнку
var paintContext = paintCanvas.getContext("2d");//визначення вікон
var hintCanvas = document.getElementById("hintCanvas");//для підсказок
var hintContext = hintCanvas.getContext("2d");//визначення вікон

var Cbtn = document.getElementById("Cbtn");//визначення елементів
var Sbtn = document.getElementById("Sbtn");
var Thickness = document.getElementById("Sizer");
var colorPicker = document.getElementById("colorPicker")

colorPicker.value = "#000000";
var selectedColor = "#000000";
Thickness.value = 5
paintContext.lineWidth = 5;
var tool = setPencil;
var toolUp = setPencilUp;

var isDragging = false;
var startPoint = { x:0, y:0 };


function canvasReady(){
    hintCanvas.onmousemove = MouseMove;
	hintCanvas.onmousedown = MouseDown;
    hintCanvas.onmouseleave = MouseLeave;
	hintCanvas.onmouseup = MouseUp;
}

function MouseDown(e){
    if(e.button==0){
        isDragging = true;
	    startPoint.x = e.offsetX;
	    startPoint.y = e.offsetY;
	    paintContext.beginPath();
	    paintContext.moveTo(startPoint.x, startPoint.y);
	    paintContext.strokeStyle = selectedColor;
    }
}

function MouseUp(e){
	isDragging = false;
    toolUp(e);
}

function MouseLeave(e){
    isDragging = false;
    hintCanvas.width = hintCanvas.width;
}

function MouseMove(e){
    displayMouse(e);
	if(isDragging){
        tool(e);
	}
}

//-------------------------- фунції для малювання різними інструментами ---------------------	
function setPencil(e){ 
    paintContext.globalCompositeOperation="source-over";
    paintContext.lineTo(e.offsetX, e.offsetY);
    paintContext.stroke();
}

function setSquare(e){
    hintCanvas.width = hintCanvas.width;
	var width = e.offsetX - startPoint.x;
	var height = e.offsetY - startPoint.y;

    hintContext.lineWidth = paintContext.lineWidth;
	hintContext.strokeRect(startPoint.x, startPoint.y, width, height);
}

function setElipse(e){
    hintCanvas.width = hintCanvas.width;
	var centerX = (e.offsetX + startPoint.x) / 2;
    var centerY = (e.offsetY + startPoint.y) / 2;
    var width = Math.abs(e.offsetX - startPoint.x) / 2;
    var height = Math.abs(e.offsetY - startPoint.y) / 2;

    hintContext.lineWidth = paintContext.lineWidth;
	hintContext.ellipse(centerX, centerY, width, height, 0, 0, 2 * Math.PI);
    hintContext.stroke();
}

function setCircle(e){
    hintCanvas.width = hintCanvas.width;
	var width = Math.abs(e.offsetX - startPoint.x);
    
    hintContext.lineWidth = paintContext.lineWidth;
    hintContext.arc(startPoint.x, startPoint.y, width, 0, 2 * Math.PI); // x, y, radiusX, startAngle, endAngle 
    hintContext.stroke();
}

function setEraser(e){
    paintContext.globalCompositeOperation="destination-out";
    paintContext.lineTo(e.offsetX, e.offsetY);
    paintContext.stroke();
}

//-----------------------------функції для проеобробки інстручентів---------------------------------------------

function setPencilUp(e){ 
}

function setSquareUp(e){
    paintContext.globalCompositeOperation="source-over";
    hintCanvas.width = hintCanvas.width;
	var width = e.offsetX - startPoint.x;
	var height = e.offsetY - startPoint.y;
	
	paintContext.strokeRect(startPoint.x, startPoint.y, width, height);
}

function setElipseUp(e){
    hintCanvas.width = hintCanvas.width;
	var centerX = (e.offsetX + startPoint.x) / 2;
    var centerY = (e.offsetY + startPoint.y) / 2;
    var width = Math.abs(e.offsetX - startPoint.x) / 2;
    var height = Math.abs(e.offsetY - startPoint.y) / 2;

    paintContext.beginPath();
	paintContext.ellipse(centerX, centerY, width, height, 0, 0, 2 * Math.PI);
    paintContext.stroke();
}

function setCircleUp(e){
    hintCanvas.width = hintCanvas.width;
	var width = Math.abs(e.offsetX - startPoint.x);

    paintContext.beginPath();
    paintContext.arc(startPoint.x, startPoint.y, width, 0, 2 * Math.PI); // x, y, radiusX, startAngle, endAngle 
    paintContext.stroke();
}

function setEraserUp(e){ 
}

//-----------------------------функції для кнопок---------------------------------------------

function selectPencil(){
    tool = setPencil;
    toolUp = setPencilUp;
}

function selectSquare(){
    tool = setSquare;
    toolUp = setSquareUp;
}

function selectElipse(){
    tool = setElipse;
    toolUp = setElipseUp;
}

function selectCircle(){
    tool = setCircle;
    toolUp = setCircleUp;
}

function selectEraser(){
    tool = setEraser;
    toolUp = setEraserUp;
}

//----------------------------------------- інші функції -------------------------------------------------

function displayMouse(e){
    hintCanvas.width = hintCanvas.width;

    hintContext.lineWidth = 1;

    // Draw a square centered at the mouse position
    hintContext.strokeRect(
        e.offsetX - paintContext.lineWidth / 2,
        e.offsetY - paintContext.lineWidth / 2,
        paintContext.lineWidth,
        paintContext.lineWidth
    );


    hintContext.lineWidth = paintContext.lineWidth;
}

colorPicker.addEventListener("input", (event) => {
    selectedColor = event.target.value;
});

function clear(){
    paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
}

function saveCanvas() {
    var dataURL = paintCanvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    link.click();
}

Thickness.addEventListener("input", (event) => {
    paintContext.lineWidth = event.target.value;
    //document.getElementById("Bdisplay").value = b;
    });

Cbtn.addEventListener("click", clear)

Sbtn.addEventListener("click", saveCanvas)


canvasReady();
//----------------------------- відображення інструментів -----------------------------------
  