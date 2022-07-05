let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let scribble;
let BGTexture,sunTexture,waterTexture,backTexture;
let counter=0;
let DayNightTheme=['Sunset','Morning','Night']
DayNightTheme.sort(()=>fxrand()-0.5);
let THEME=DayNightTheme[0]
let FHC,SHC;
let memory=fxrand()*(0.75);
let memoryPercentage=Math.floor((memory*100)/0.75)
function setup() {
  canv=createCanvas(window.innerWidth, window.innerHeight*0.75);

  //colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES)
  randomSeed(seed);
  canv.position(window.innerWidth/2-window.innerWidth/2,window.innerHeight/2-window.innerHeight/2*0.75)

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

  waterTexture=createGraphics(width,height)
  //waterTexture.colorMode(HSB,360,100,100,100)
  scribble=new Scribble(waterTexture)
  scribble.bowing = 0.15
  scribble.roughness=3
  let c1=color('lightblue')
  let c2=color('darkblue')
  for(let i=height/2;i<=height;i+=0.5){
    let c3 = lerpColor(c1,c2,map(i,height/2,height,0,1))
    waterTexture.stroke(c3)
    scribble.scribbleLine(0,i,width,i)
  }

  backTexture = createGraphics(width,height/2)
  for(let i=0;i<100;i+=1){
    push()
    backTexture.fill(random(0,50))
    //backTexture.translate(random(0,width),random(0,height/2))
    backTexture.rect(random(0,width),random(0,height/2),random(width/150,width/25),height/2)
    pop()
  }
  //noLoop()

}

function doResize(){
  setup()
  draw()
}

function draw() {
  counter+=map(frameCount,0,100,0,0.25)
  clear()
  background(0)
  image(BGTexture,0,0)
  image(backTexture,0,0)
  image(waterTexture,0,0)
  
    loadPixels()
  for(let i=0;i<width;i+=1){
    for(let j=0;j<height;j+=1){
      let r=random()
      if(counter<memory){
        if(r<counter){
          let c=get(random(0,width),random(0,height))
  
          set(i,j,c)
        }
      }
      else{
        if(r<memory){
          let c=get(random(0,width),random(0,height))
          set(i,j,c)
        }
        noLoop()
        fxpreview()
        
      }
    }
  }
  updatePixels() 




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
function createRound(radius,fisrtP,secondP,maintheme){
  let c=color(360,random(30,100),random(30,100))
  stroke(c)
  drawingContext.shadowBlur=10;
  drawingContext.shadowColor='red';
  if(secondP>=fisrtP){
    for(let angle=fisrtP;angle<=secondP;angle+=1){
      let x=radius*cos(angle)
      let y=radius*sin(angle)
      point(x,y)
    }
  }
  else{
    for(let angle=fisrtP;angle>=secondP;angle-=1){
      let x=radius*cos(angle)
      let y=radius*sin(angle)
      point(x,y)
    }
  }

}
