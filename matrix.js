const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;


canvas.width = cw;
canvas.height = ch;

//Параметрв окна

window.addEventListener('resize', function(event) {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw
    canvas.height = ch;
    maxColumns = cw / fontSize;
    console.log(cw, ch)
}, true);
//Словарь
let charArr = [
  "一",
  "人",
  "七",
  "八",
  "九",
  "十",
  "入",
  "二",
  "三",
  "上",
  "下",
  "大",
  "女",
  "万",	
  "土",	
  "山",	
  "千",	
  "川",	
  "子",	
  "小",
  "口",	
  "手",	
  "五",	
  "日",	
  "六",	
  "分",		
  "円",	
  "月",	
  "中",
  "午",
  "今",
  "木",	
  "父",	
  "火",	
  "天",
  "友",	
  "水",
  "少",	
  "左",	
  "四",
];
//Размер Букв
let maxCharCount = 250;
let fallingCharArr = [];
let fontSize = 10;
let maxColumns = cw / fontSize;


let frames = 0;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
///Создаём рандомное падение
  draw(ctx) {
    this.value =
      charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    ctx.fillStyle = "#FF0000";
    ctx.font = fontSize + "px sans-serif";
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}
///Обновления
let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }
 ///Плотность и кол-во
  ctx.fillStyle = "rgba(0,2,0,0.1)";
  ctx.fillRect(0, 0, cw, ch);
  for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
};

update();
