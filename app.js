const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// pixcel을 다루는 canvas가 얼마나 큰지 알려줘야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// context : canvas 안에서 픽셀을 다룸
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  //경로를 만든다.
  if (!painting) {
    ctx.beginPath(); //경로 생성
    ctx.moveTo(x, y); //선 시작 좌표
  } else {
    //그린다.
    ctx.lineTo(x, y); //선 끝 좌표
    ctx.stroke(); //선 그리기
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  // click 했을 때, 발생하는 이벤트
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
