let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let scribble;
let sunText;


var streams = [];
var fadeInterval = 1.4;
var symbolSize = 15;


function setup() {
  minimal=min(window.innerWidth, window.innerHeight)
  canv=createCanvas(minimal, minimal*0.75);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES)
  randomSeed(seed);
  canv.position(window.innerWidth/2-minimal/2,window.innerHeight/2-minimal/2*0.75)
  scribble= new Scribble()

  sunText=createGraphics(width,height/2)
  sunText.angleMode(DEGREES)
  sunText.colorMode(HSB,360,100,100,100)
  sunText.randomSeed(seed)
  sunText.push()
  sunText.translate(width/2,height/2)
  for(let i=0;i<minimal/4;i+=1){
    for(let j=0;j<=360;j+=0.25){
      let x=i*cos(j)
      let y=i*sin(j)
      let r=random()
      sunText.stroke(color(360,map(random(),0,1,100,50),map(i,0,minimal/4,100,30)))
      if(r<=0.9){
        sunText.point(x,y)
      }
    }
  }
  sunText.pop()


  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new MatrixStream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);


  //noLoop()
}

function doResize(){
  setup()
  draw()
}

function draw() {
  background(10, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
  

  
  for(let i=0;i<500;i+=1){
    stroke(color(200,0,map(i,0,500,0,50)))
    let endX=map(i,0,500,width/2-minimal/4,width/2)
    let begX=map(i,0,500,0,width/2)
    line(begX,height,endX,height/2)
  }
  for(let i=0;i<500;i+=1){
    stroke(color(200,0,map(i,0,500,50,0)))
    let endX=map(i,0,500,width/2,width/2+minimal/4)
    let begX=map(i,0,500,width/2,width)
    line(begX,height,endX,height/2)
  }

  image(sunText,0,0)
  fxpreview()

}
window.addEventListener('resize',doResize);

function linearGradient(sX, sY, eX, eY, colorS, colorE){
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  BGTexture.drawingContext.fillStyle = gradient;
}

function keyTyped(){
  if(key=='s' || key=='S'){
    saveCanvas('Claws.png');
  }
}


function MatrixSymbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,9));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function MatrixStream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 22);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new MatrixSymbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(120, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}




