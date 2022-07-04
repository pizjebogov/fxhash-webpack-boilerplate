let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let scribble;
let BGTexture;

let DayNightTheme=['Sunset','Morning','Night']
DayNightTheme.sort(()=>fxrand()-0.5);
let THEME=DayNightTheme[0]
let FHC,SHC;

function setup() {
  canv=createCanvas(window.innerWidth, window.innerHeight*0.75);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES)
  randomSeed(seed);
  canv.position(window.innerWidth/2-window.innerWidth/2,window.innerHeight/2-window.innerHeight/2*0.75)
  scribble= new Scribble()
  scribble.bowing = 0.15
  scribble.roughness=3

  switch(THEME){
    case 'Sunset':
      FHC='#C73866'
      SHC='#FD8F52'
      break;
    case 'Morning':
      FHC='#fbb35e'
      SHC='#fae6aa'
      break;
    case 'Night':
      FHC='#2a3e72'
      SHC='#45589a'
  }
  BGTexture=createGraphics(width,height)
  BGTexture.rectMode(CENTER)
  BGTexture.noStroke()
  linearGradient(width/2,0,width/2,height,FHC,SHC)
  BGTexture.rect(width/2,height/2,width,height)
  noLoop()

}

function doResize(){
  setup()
  draw()
}

function draw() {

  clear()
  background(0)
  image(BGTexture,0,0)
  let c1=color(191,100,71,50)
  let c2=color(195,98,32,50)
  for(let i=height/2;i<=height;i+=0.5){
    let c3 = lerpColor(c1,c2,map(i,height/2,height,0,1))
    stroke(c3)
    scribble.scribbleLine(0,i,width,i)
  }
  
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
