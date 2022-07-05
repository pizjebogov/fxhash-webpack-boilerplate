let seed=Math.round(fxrand() * 10000000,0); // generate a random seed for fx_hash
let minimal,canv;
let scribble;
let BGTexture,sunTexture,waterTexture,backTexture;
let counter=0;
let DayNightTheme=['Sunset','Morning','Night']
DayNightTheme.sort(()=>fxrand()-0.5);
let THEME=DayNightTheme[0]
let FHC,SHC,SC1,SC2;
let memory=fxrand()*(0.75);
let memoryPercentage=Math.floor((memory*100)/0.75)
let memoryDisturbed=false;
let bgScrib;
let sunScrib;
function setup() {
  canv=createCanvas(window.innerWidth, window.innerHeight*0.75);
  minimal=min(width,height)
  //colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES)
  randomSeed(seed);
  canv.position(window.innerWidth/2-window.innerWidth/2,window.innerHeight/2-window.innerHeight/2*0.75)

  switch(THEME){
    case 'Sunset':
      FHC='#C73866'
      SHC='#FD8F52'
      SC1 = 'orange'
      SC2='darkred'
      break;
    case 'Morning':
      FHC='#fbb35e'
      SHC='#fae6aa'
      SC1='yellow'
      SC2='lightyellow'
      break;
    case 'Night':
      FHC='#2a3e72'
      SHC='#45589a'
      SC1='black'
      SC2='gray'
      break;
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
    backTexture.push()
    backTexture.fill(random(0,50))
    backTexture.rect(random(0,width),random(0,height/2),random(width/150,width/25),height/2)
    backTexture.pop()
  }

  bgScrib = new Scribble(backTexture)
  backTexture.loadPixels()
  for(let i=0;i<width;i+=3){
    for(let j=0;j<height;j+=3){
      let c=backTexture.get(i,j)
      backTexture.fill(c)
      backTexture.noStroke()
      bgScrib.scribbleEllipse(i,j,3,3)
    }
  }

  sunTexture = createGraphics(width,height/2)
  sunScrib = new Scribble(sunTexture)
  sunTexture.push()
  sunTexture.translate(width/2,height/4)
  for(let i=0;i<50;i+=1){
    let sz = map(i,0,50,minimal/250,minimal/25)
    let col = lerpColor(color(SC1),color(SC2),map(i,0,50,0,1))
    sunTexture.strokeWeight(map(i,0,50,minimal/2500,minimal/1000))
    for(let angle=0;angle<=360;angle+=1){
      let r = random()
      if(r<0.5){
        sunTexture.fill(col)
        let rad = map(i,0,50,0,width/5)
        let x = rad*cos(angle)
        let y = rad*sin(angle)
        sunScrib.scribbleEllipse(x,y,sz,sz)
      }
    }
  }
  sunTexture.pop()
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
  image(sunTexture,0,0)
  image(backTexture,0,0)
  image(waterTexture,0,0)



  
  /*   loadPixels()
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
  updatePixels() */
/* if(memoryDisturbed==true){
  loadPixels()
  for(let variants=0;variants<4;variants+=1){
    let x1=Math.floor(random(0,width))
    let x2=Math.floor(random(0,width))
    let change;
    if(x1>x2){
      change=x1
      x1=x2
      x2=change
    }
    let y1=Math.floor(random(0,height))
    let y2=Math.floor(random(0,height))
    if(y1>y2){
      change=y1
      y1=y2
      y2=change
    }
    let sdvX=Math.floor(random(0,width))
    let sdvY=Math.floor(random(0,height))
    for(let i=x1;i<x2;i+=1){
      for(let j=y1;j<y2;j+=1){
        let c=get(i,j)
        if(i+sdvX < width && j+sdvY < height){
          set(i+sdvX,j+sdvY,c)
        }
        else{
          if(i+sdvX < width){
            set(i+sdvX-width,j+sdvY,c)
          }
          else{
            set(i+sdvX,j+sdvY-height,c)
          }
          
        }
        }
      }
      updatePixels()
    }
}
else{
  
} */
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
  else if(key=='d' || key=='D'){
    memoryDisturbed==true ? memoryDisturbed=false : memoryDisturbed=true
  }
}
function createSun(){
  

}
