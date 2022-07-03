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
  noLoop()
}

function doResize(){
  setup()
  draw()
}

function draw() {
  clear()
  background('wheat')
  

  
  for(let i=0;i<250;i+=1){
    stroke(color(200,0,map(i,0,250,0,50)))
    let endX=map(i,0,250,width/2-minimal/4,width/2)
    let begX=map(i,0,250,0,width/2)
    scribble.scribbleLine(begX,height,endX,height/2)
  }
  for(let i=0;i<250;i+=1){
    stroke(color(200,0,map(i,0,250,50,0)))
    let endX=map(i,0,250,width/2,width/2+minimal/4)
    let begX=map(i,0,250,width/2,width)
    scribble.scribbleLine(begX,height,endX,height/2)
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







