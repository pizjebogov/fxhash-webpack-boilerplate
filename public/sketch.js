let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let scribble;
let sunText;

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
    for(let j=0;j<=360;j+=1){
      let x=i*cos(j)
      let y=i*sin(j)
      let r=random()
      sunText.stroke(color(360,map(i,0,minimal/4,100,80),map(i,0,minimal/4,100,50)))
      if(r<0.75){
        sunText.point(x,y)
      }
    }
  }
  sunText.pop()
  noLoop()
}

function doResize(){
  setup()
  draw()
}

function draw() {
  clear()
  background(255)
  image(sunText,0,0)
  for(let i=0;i<height;i+=1){
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
    saveCanvas('Claws.png');
  }
}







