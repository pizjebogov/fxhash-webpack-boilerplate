let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let scribble;

function setup() {
  canv=createCanvas(window.innerWidth, window.innerHeight*0.75);
  colorMode(HSB, 360, 100, 100, 100);
  
  angleMode(DEGREES)
  randomSeed(seed);
  canv.position(window.innerWidth/2-window.innerWidth/2,window.innerHeight/2-window.innerHeight/2*0.75)

  scribble= new Scribble()


  noLoop()

}

function doResize(){
  setup()
  draw()
}

function draw() {

  clear()
  //noFilter()
  background(0)
  
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
    saveCanvas('Picture.png');
  }
}
