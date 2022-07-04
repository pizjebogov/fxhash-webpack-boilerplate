let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let WaterText;
let scribble;
let FlowerTextOrig,FlowerTextReversed;
let BGTexture;
let blurCounter=Math.round(fxrand()*3)
let grassText;

let n;
let d;
let k;
var baseR;

let FlowerVariants=['Azalea','Camellia','Rose','Aster','Peony']
FlowerVariants.sort(()=>fxrand()-0.5);
let myFlowerVar=FlowerVariants[0]
switch(myFlowerVar){
  case 'Azalea':
    n=4
    d=3
    k=(n/d)
    break;
  case 'Camellia':
    n=6
    d=8
    k=(n/d)
    break;
  case 'Rose':
    n=1
    d=8
    k=(n/d)
    break;
  case 'Aster':
    n=8
    d=1
    k=(n/d)
    break;
  case 'Peony':
    n=8
    d=9
    k=(n/d)
    break;
}

let firstGroundVar=['Nothing','Grass','Reeds']
firstGroundVar.sort(()=>fxrand()-0.5);
let firstGVAR=firstGroundVar[0]
let MainFlowerColor=Math.floor(fxrand()*360)

let BGPalette=['Day','Night']
BGPalette.sort(()=>fxrand()-0.5);
let BGVariance=BGPalette[0]
let FHC,SHC;
switch(BGVariance){
  case 'Night':
    FHC='Black'
    SHC='Indigo'
    break;
  case 'Day':
    FHC='Wheat'
    SHC='Orange'
    break;
}

let WaterPalette=['Light','Dark']
WaterPalette.sort(()=>fxrand()-0.5);
let WaterVariance=WaterPalette[0]
let FWC,SWC;



function setup() {
  minimal=min(window.innerWidth, window.innerHeight)

  canv=createCanvas(minimal*0.75, minimal);
  colorMode(HSB, 360, 100, 100, 100);
  
  angleMode(DEGREES)
  randomSeed(seed);
  canv.position(window.innerWidth/2-minimal/2*0.75,window.innerHeight/2-minimal/2)


  baseR=minimal/150
  scribble= new Scribble()

  FlowerTextOrig=createGraphics(width,height/100*40)
  FlowerTextOrig.translate(FlowerTextOrig.width/2,FlowerTextOrig.height)
  FlowerTextOrig.angleMode(DEGREES)
  FlowerTextOrig.colorMode(HSB,360,100,100,100)
  FlowerTextOrig.scale(minimal/754)
  branch(40,0)

  FlowerTextReversed=createGraphics(width,height/100*40)
  //FlowerTextReversed.pixelDensity(10)
  FlowerTextOrig.loadPixels()
  for(let i=0;i<FlowerTextOrig.width;i+=1){
    for(let j=0;j<FlowerTextOrig.height;j+=1){
      let c=FlowerTextOrig.get(i,j)
      FlowerTextReversed.set(i,FlowerTextReversed.height-j,c)
    }
  }
  FlowerTextReversed.updatePixels() 


  BGTexture = createGraphics(width,height)
  BGTexture.rectMode(CENTER);
  BGTexture.colorMode(HSB,360,100,100,100)
  BGTexture.noStroke()
  linearGradient(
    width/2, 0, //Start point
    width/2, height, //End point
    FHC, //Start color
    SHC, //End color
  );
  BGTexture.drawingContext.shadowBlur=0
  BGTexture.rect(BGTexture.width/2,BGTexture.height/2,BGTexture.width,BGTexture.height)
  BGTexture.loadPixels()
  for(let i=0;i<BGTexture.width*BGTexture.height;i+=1){
    let r = random()
    if(r<0.25){
      let xPixel = Math.floor(random(0,BGTexture.width))
      let yPixel = Math.floor(random(0,BGTexture.height))
      let colPixel = BGTexture.get(xPixel,yPixel)
      let xPixel2 = Math.floor(random(0,BGTexture.width))
      let yPixel2 = Math.floor(random(0,BGTexture.height))
      BGTexture.set(xPixel2,yPixel2,colPixel)
    }
  }
  BGTexture.updatePixels()

  WaterText=createGraphics(width,height/100*60);
  WaterText.background(random(70,150), random(70, 180), random(70,200));

  for(i=0; i<50; i+=1){

    WaterText.fill(random(2,10), random(2, 10), random(2,12));
    WaterText.noStroke();
    WaterText.blendMode(ADD);

    WaterText.rect(random(0, width),random(height,0), minimal/2, minimal/8);
    WaterText.ellipse(random(0, width),random(height,0),minimal/2, minimal/20);
    WaterText.ellipse(random(0, width),random(height,0),minimal/1.5, minimal/20);
  }

  switch(WaterVariance){
    case 'Light':
      FWC=color(220,52,73,50)
      SWC=color(176,90,50,50)
      break;
    case 'Dark':
      FWC=color(207,83,47,50)
      SWC=color(211,95,44,50)
      break;
  }
if(firstGVAR=='Grass'){
  grassText = createGraphics(width,height)
  
   for(let i=0;i<2000;i+=1){
    grassText.noStroke()
    let v1 = createVector(random(0,width),height)
    let v2 = createVector(v1.x,random(height*0.45,height*0.95))
    let FC=random(70,130)
    for(let j=0;j<1;j+=0.025){
      let v3 = p5.Vector.lerp(v1,v2,j)
      grassText.fill(color(FC,80,map(j,0,1,60,0),50))
      grassText.circle(map(noise(j,i),0,1,v3.x-width/10,v3.x+width/10),v3.y,map(j,0,1,minimal/50,0))
    }
  } 
}
else if(firstGVAR=='Nothing'){
  grassText = createGraphics(width,height)
}
else if(firstGVAR=='Reeds'){
  grassText = createGraphics(width,height)
  
   for(let i=0;i<200;i+=1){
    grassText.noStroke()
    let v1 = createVector(random(0,width/100*40),height)
    let v2 = createVector(0,random(height*0.25,height*0.95))
    let FC=random(30,100)
    for(let j=0;j<1;j+=0.01){
      let v3 = p5.Vector.lerp(v1,v2,j)
      grassText.fill(color(FC,80,map(j,0,1,60,0),50))
      grassText.circle(map(noise(j,i),0,1,v3.x-width/10,v3.x+width/10),v3.y,map(j,0,1,minimal/50,0))
    }
  }

  for(let i=0;i<200;i+=1){
    grassText.noStroke()
    let v1 = createVector(random(grassText.width/100*60,grassText.width),height)
    let v2 = createVector(grassText.width,random(height*0.25,height*0.95))
    let FC=random(30,100)
    for(let j=0;j<1;j+=0.01){
      let v3 = p5.Vector.lerp(v1,v2,j)
      grassText.fill(color(FC,80,map(j,0,1,60,0),50))
      grassText.circle(map(noise(j,i),0,1,v3.x-width/10,v3.x+width/10),v3.y,map(j,0,1,minimal/50,0))
    }
  }
}


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
  image(BGTexture,0,0)
  image(WaterText,0,height/100*40)
  image(FlowerTextReversed,0,height/100*40)

  strokeWeight(minimal/1250)
  let from=FWC
  let to=SWC
  for(let i=height/100*40;i<=height;i+=height/1500){   

    let c = lerpColor(from,to,map(i,height*0.4,height,0,1))
    stroke(c)
    scribble.scribbleLine( 0, i, width, i );
  }
  filter(BLUR,1.5)
  image(FlowerTextOrig,0,0)

  image(grassText,0,0)
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



function branch(len,variance){
  FlowerTextOrig.push()
  if(len>10){
    FlowerTextOrig.strokeWeight(map(len,10,40,1,10));
    FlowerTextOrig.stroke('black');
    FlowerTextOrig.line(0,0,0,-len);
    FlowerTextOrig.translate(0,-len);
    FlowerTextOrig.rotate(random(-40,-45));
    branch(len*random(0.87,0.92),random())
    FlowerTextOrig.rotate(random(80,90));
    branch(len*random(0.87,0.92),random())
  }
  else{
    if(variance<0.98){
      FlowerTextOrig.fill(color(100,map(random(),0,1,20,100),map(random(),0,1,20,100),50))
      FlowerTextOrig.stroke('black')
      FlowerTextOrig.ellipse(0,0,minimal/50,minimal/100)
    }
    else{
      FlowerTextOrig.fill(color(MainFlowerColor,map(random(),0,1,10,100),100,100))
      FlowerTextOrig.stroke('black')
      FlowerTextOrig.beginShape();
    for(let i=0;i<360*d;i+=1){
      let rad = 3*baseR * cos(k * i);
      let x=rad*cos(i);
      let y=rad*sin(i);
      FlowerTextOrig.vertex(x,y)
    }
    FlowerTextOrig.endShape();
    }
  }
  FlowerTextOrig.pop()

}
