const W=960, H=600;
const OceanTheme = Object.freeze({
  bg:'#071B30', sky:'#0B2847', cloudBack:'#193D61', cloudFront:'#2D587C',
  seaBack:'#174161', seaMid:'#103553', seaFront:'#092540',
  pale:'#E7E9E2', gold:'#D9BA79'
});

const tower={x:734,y:118,w:174,h:352};
const memory = {
  x: 185,
  y: 125,
  w: 360,
  h: 360
};
const girlPos={x:870,y:550,w:200,h:100};
const door={cx:822,yBottom:459,width:22,height:36};
let lighthouseImg=null, girlImg=null;
let stars=[], whales=[], grainLayer;
let video=null, faceMesh=null, faces=[];
let cameraReady=false, faceModelReady=false, modelFailed=false;
let portraitLayer=null;
let secs=0, previousPortraitAt=0;
let cameraStarting=false, modelStarting=false;
let lastFaceTimestamp=0;
let displayMode='none';
let cameraError='';
let portraitEnabled=false;

function setup() {
  pixelDensity(1);
  createCanvas(W,H).parent('sketch-holder');
  frameRate(40);
  randomSeed(7);
  for(let i=0;i<60;i++) stars.push({x:random(W),y:random(230),r:random(.45,1.5),a:random(20,110)});
  whales=[new Whale(120,392,.9,.45,1),new Whale(365,475,.62,.27,3)];
  grainLayer=makeGrain();
  loadImage('assets/lighthouse.svg',img=>lighthouseImg=img,err=>console.warn('Lighthouse SVG:',err));
  loadImage('assets/peek_girl_ref.png',img=>girlImg=img,err=>console.warn('Girl PNG:',err));
  beginCamera();
  setupVisionButton();
}

function draw() {
  secs+=Math.min(deltaTime,50)/1000;
  background(OceanTheme.bg);
  drawSky();
  drawClouds();
  drawSea();
  for(const whale of whales) { whale.update(secs,Math.min(deltaTime,50)/16.667); whale.display(); }
  drawSeaLines(false);

  if(cameraReady && video && video.elt.readyState>=2 && millis()-previousPortraitAt>140) {
    updatePixelPortrait();
    previousPortraitAt=millis();
  }

  let beam=getBeam(secs);
  drawBeam(beam);
  if (portraitEnabled) revealPortrait(beam);

  drawSeaLines(true); // 波纹先画，之后被陆地遮住
  drawCliff();
  drawPathToGirl();
  drawLighthouse();
  drawDoor(); // 门最后覆盖路的起点，保证门口清楚可见
  drawGirlPlaceholder();
  image(grainLayer,0,0);
  drawTitle();
  if(frameCount%30===0) refreshCameraStatus();
}

function drawSky() {
  noStroke();fill(OceanTheme.sky);rect(0,185,W,225);
  for(const s of stars) {fill(220,230,231,s.a);circle(s.x,s.y,s.r*1.4);}
}

function drawClouds() {
  noStroke();
  fill(OceanTheme.cloudBack);
  for(const c of [[40,145,170,115],[180,144,215,118],[344,165,220,110],[530,154,218,120],[700,164,200,108],[890,146,215,130]]) ellipse(...c);
  rect(0,150,W,165);
  fill(OceanTheme.cloudFront);
  for(const c of [[60,305,188,115],[220,301,222,111],[385,315,205,115],[572,311,230,113],[790,315,242,123],[950,325,160,120]]) ellipse(...c);
  rect(0,320,W,78);
}

function waveY(x,y,t) {return y+sin(x*.013-t*.62)*8+sin(x*.027+t*.37+y*.05)*3.5;}
function drawSea() {
  noStroke();
  for(const l of [
    {y:340,c:OceanTheme.seaBack,p:0},
    {y:420,c:OceanTheme.seaMid,p:1.6},
    {y:505,c:OceanTheme.seaFront,p:3.0}
  ]) {
    fill(l.c);beginShape();
    for(let x=0;x<=W;x+=12)vertex(x,waveY(x,l.y,secs+l.p));
    vertex(W,H);vertex(0,H);endShape(CLOSE);
  }
}

function drawSeaLines(front) {
  noFill();const start=front?495:355,count=front?7:11;
  for(let i=0;i<count;i++) {
    stroke(139,169,191,front?24+i*2:43);strokeWeight(.8);
    beginShape();
    for(let x=0;x<=W;x+=8) {
      let y=start+i*(front?15:13)+sin(x*.015-secs*.57+i*.36)*(4+i*.22)
        +sin(x*.031+secs*.35+i*.58)*1.9;
      vertex(x,y);
    }
    endShape();
  }
}

function getBeam(t) {
  const origin = { x:786, y:184 };
  const centerY = 340;
  const swing = 400;
  const speed = 0.4;
  const cy = centerY + sin(t * speed - 0.3) * swing;
  return {
    origin,
    a: { x:-20, y:cy-145 },
    b: { x:-20, y:cy+145 }
  };
}

function beamTriangle(ctx,b) {
  ctx.beginPath();ctx.moveTo(b.origin.x,b.origin.y);
  ctx.lineTo(b.a.x,b.a.y);ctx.lineTo(b.b.x,b.b.y);ctx.closePath();
}

function drawBeam(b) {
  const ctx=drawingContext;ctx.save();
  const grad=ctx.createLinearGradient(b.origin.x,b.origin.y,-20,(b.a.y+b.b.y)/2);
  grad.addColorStop(0,'rgba(249,205,106,0.48)');
  grad.addColorStop(.6,'rgba(237,200,109,0.24)');
  grad.addColorStop(1,'rgba(230,192,103,0.09)');
  ctx.fillStyle=grad;beamTriangle(ctx,b);ctx.fill();ctx.restore();
}

function revealPortrait(b) {
  if(!portraitLayer)return;
  const ctx=drawingContext;
  ctx.save();beamTriangle(ctx,b);ctx.clip();
  image(portraitLayer,memory.x,memory.y,memory.w,memory.h);
  ctx.restore();
}

function drawCliff() {
  noStroke();
  fill('#06131F');
  beginShape();
  vertex(650,600);
  bezierVertex(652,577,659,555,677,535);
  bezierVertex(701,512,711,495,720,471);
  bezierVertex(736,446,753,425,774,421);
  bezierVertex(805,416,841,422,865,431);
  bezierVertex(900,443,927,438,960,426);
  vertex(960,600);endShape(CLOSE);
  fill('#0A1B2B');
  beginShape();
  vertex(750,600);
  bezierVertex(771,554,791,532,804,500);
  bezierVertex(823,474,851,462,875,468);
  bezierVertex(910,478,935,510,960,521);
  vertex(960,600);endShape(CLOSE);
  noFill();stroke(77,119,153,100);strokeWeight(1.3);
  bezier(677,535,696,521,718,501,733,466);
  bezier(751,572,787,533,800,509,826,489);
}

// road
function roadPoint(u) {
  return {
    x: bezierPoint(door.cx,715,735,870,u),
    y: bezierPoint(door.yBottom - 12,515,585,569,u)
  };
}

function drawRoadRibbon(extra, rgba) {
  noStroke(); fill(...rgba);
  const left=[],right=[];
  const n=72;
  for(let i=0;i<=n;i++) {
    const u=i/n;
    const p=roadPoint(u);
    const p0=roadPoint(Math.max(0,u-.001));
    const p1=roadPoint(Math.min(1,u+.001));
    const dx=p1.x-p0.x,dy=p1.y-p0.y;
    const len=Math.hypot(dx,dy)||1;
    const nx=-dy/len,ny=dx/len;
    const half=door.width/2+u*15+extra;
    left.push({x:p.x+nx*half,y:p.y+ny*half});
    right.push({x:p.x-nx*half,y:p.y-ny*half});
  }
  beginShape();
  for(const p of left) vertex(p.x,p.y);
  for(let i=right.length-1;i>=0;i--) vertex(right[i].x,right[i].y);
  endShape(CLOSE);
}

function drawPathToGirl() {
  drawRoadRibbon(9,[217,186,121,36]);
  drawRoadRibbon(3,[239,193,91,144]);
  drawRoadRibbon(-4,[255,224,140,100]);
}
function drawDoor() {
  const left=door.cx-door.width/2;
  const right=door.cx+door.width/2;
  const top=door.yBottom-door.height;
  const ctx=drawingContext;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(left,door.yBottom);
  ctx.lineTo(left,top+12);
  ctx.quadraticCurveTo(door.cx,top-9,right,top+12);
  ctx.lineTo(right,door.yBottom);
  ctx.closePath();
  ctx.fillStyle='#06131F';
  ctx.strokeStyle='#D9BA79';
  ctx.lineWidth=1.9;
  ctx.fill();ctx.stroke();
  ctx.restore();
}

function drawLighthouse() {
  if(lighthouseImg) image(lighthouseImg,tower.x,tower.y,tower.w,tower.h);
  else fallbackLighthouse();
  noStroke();fill(244,206,110,170);circle(786,184,7);
}
function fallbackLighthouse() {
  push();stroke('#8FA8BB');strokeWeight(2);fill('#092038');
  quad(775,205,836,205,865,472,748,472);rect(772,173,64,34);
  triangle(768,173,804,142,840,173);
  noStroke();fill(OceanTheme.gold);rect(787,175,34,24);pop();
}

function drawGirlPlaceholder() {
  if (!girlImg) return;
  push();
  imageMode(CENTER);
  image(girlImg, girlPos.x, girlPos.y, girlPos.w, girlPos.h);
  imageMode(CORNER);
  pop();
}

function drawTitle() {
  push();noStroke();fill(OceanTheme.pale);textFont('Georgia');textSize(34);
  text('Into the Ocean',49,74);fill(OceanTheme.gold);textSize(10);
  textFont('sans-serif');text('MEMORIES IN THE LIGHT',52,96);pop();
}

function makeGrain() {
  let pg=createGraphics(W,H);pg.pixelDensity(1);pg.clear();pg.noStroke();pg.randomSeed(12);
  for(let i=0;i<2800;i++){pg.fill(224,233,225,pg.random(2,9));pg.circle(pg.random(W),pg.random(H),pg.random(.4,1.1));}
  return pg;
}

function setupVisionButton(){
  const btn=document.getElementById('vision-toggle');
  if(!btn) return;
  const toggle=()=>{
    portraitEnabled=!portraitEnabled;
    btn.classList.toggle('active', portraitEnabled);
    btn.setAttribute('aria-pressed', portraitEnabled ? 'true' : 'false');
    btn.textContent='V';
    refreshCameraStatus();
  };
  btn.addEventListener('click', toggle);
  window.addEventListener('keydown', e=>{
    if(e.key==='v'||e.key==='V') toggle();
  });
}

// Camera + FaceMesh 
function setStatus(s) {const el=document.getElementById('camera-status');if(el)el.textContent=s;}
function refreshCameraStatus(){
  if(cameraError){setStatus('Camera error: '+cameraError+' — refresh or retry in browser settings');return;}
  if(!cameraReady){setStatus('Camera: requesting permission / waiting for video…');return;}
  if(!faceModelReady){setStatus('Camera ✓ · FaceMesh: '+(modelFailed?'failed, center-crop fallback':'loading…'));return;}
  let recent=millis()-lastFaceTimestamp<1600;
  let visionText = portraitEnabled ? 'Vision ON' : 'Vision OFF';
  setStatus('Camera ✓ · FaceMesh ✓ · '+(recent?'face detected':'no face detected (temporary center-crop preview)')+' · '+visionText);
}

function beginCamera(){
  if(cameraStarting || cameraReady) return;
  if(!navigator.mediaDevices?.getUserMedia) {
    cameraError='Camera API not available: use Live Server at http://127.0.0.1 or https';
    refreshCameraStatus();return;
  }
  cameraStarting=true;cameraError='';setStatus('Requesting camera permission…');
  try {
    video=createCapture(VIDEO,stream=>{console.log('Camera stream granted:',stream?.active);});
    video.size(640,480);
    video.hide();
    video.elt.setAttribute('playsinline','');
    video.elt.muted=true;
    video.elt.addEventListener('loadeddata',onVideoReady,{once:true});
    video.elt.addEventListener('error',()=>{cameraError='Video element failed to load';cameraStarting=false;refreshCameraStatus();});
    if(video.elt.readyState>=2)onVideoReady();
  } catch(e){cameraError=e.message;cameraStarting=false;refreshCameraStatus();}
}

function onVideoReady(){
  if(cameraReady)return;
  cameraReady=true;cameraStarting=false;
  setStatus('Camera video ready ✓ · loading FaceMesh…');
  startModel();
}

async function startModel(){
  if(modelStarting||faceModelReady)return;
  modelStarting=true;
  try {
    if(typeof ml5==='undefined')throw new Error('ml5.js did not load');
    faceMesh=await ml5.faceMesh({maxFaces:1,refineLandmarks:false,flipHorizontal:false});
    faceModelReady=true;
    faceMesh.detectStart(video,results=>{
      faces=results||[];
      if(faces.length>0)lastFaceTimestamp=millis();
    });
    setStatus('FaceMesh ready ✓ · press V to reveal your portrait');
  } catch(e) {
    console.error('FaceMesh:',e);
    modelFailed=true;
    setStatus('Camera ✓ · FaceMesh error: '+e.message+' · fallback active');
  } finally {modelStarting=false;}
}

function faceBounds(face){
  let p=face?.keypoints;if(!p?.length)return null;
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(const q of p){if(!Number.isFinite(q.x)||!Number.isFinite(q.y))continue;
    minX=Math.min(minX,q.x);maxX=Math.max(maxX,q.x);
    minY=Math.min(minY,q.y);maxY=Math.max(maxY,q.y);
  }
  if(!Number.isFinite(minX)||maxX-minX<24)return null;
  return {cx:(minX+maxX)/2,cy:(minY+maxY)/2,w:maxX-minX,h:maxY-minY};
}

function updatePixelPortrait(){
  const e=video?.elt;if(!e||e.readyState<2||!e.videoWidth)return;
  const vw=e.videoWidth, vh=e.videoHeight;
  let b=null;
  if(faces.length && millis()-lastFaceTimestamp<1600)b=faceBounds(faces[0]);
  const useFace=!!b;
  if(!b)b={cx:vw*.5,cy:vh*.45,w:vw*.38,h:vh*.55};
  let cw=b.w*(useFace?1.45:1.0),ch=b.h*(useFace?1.65:1.0);
  let sx=Math.max(0,Math.min(vw-cw,b.cx-cw/2));
  let sy=Math.max(0,Math.min(vh-ch,b.cy-ch/2));
  let sw=Math.min(vw-sx,cw),sh=Math.min(vh-sy,ch);
  const cols=54,rows=66;
  if(sw<=0||sh<=0)return;
  if(!window.__portraitSample){window.__portraitSample=createGraphics(cols,rows);window.__portraitSample.pixelDensity(1);}
  if(!portraitLayer){portraitLayer=createGraphics(270,330);portraitLayer.pixelDensity(1);}
  let sample=window.__portraitSample;
  let ctx=sample.drawingContext;
  ctx.clearRect(0,0,cols,rows);
  ctx.drawImage(e,sx,sy,sw,sh,0,0,cols,rows);
  sample.loadPixels();
  portraitLayer.clear();portraitLayer.noStroke();
  const cellW=portraitLayer.width/cols,cellH=portraitLayer.height/rows;
  const colors=[[13,33,55],[31,67,101],[73,119,153],[139,179,201],[231,237,233]];
  for(let yy=0;yy<rows;yy++)for(let xx=0;xx<cols;xx++){
    let idx=4*(yy*cols+xx);
    let r=sample.pixels[idx],g=sample.pixels[idx+1],bb=sample.pixels[idx+2];
    let lum=.299*r+.587*g+.114*bb;
    let level=lum<50?0:lum<100?1:lum<155?2:lum<210?3:4;
    let nx=(xx+.5-cols/2)/(cols*.46),ny=(yy+.5-rows/2)/(rows*.48);
    let radius=Math.sqrt(nx*nx+ny*ny);
    let alpha=170*(1-smoothstep(.58,1.0,radius)); // lower opacity to blend into background
    if(alpha<2)continue;
    let c=colors[level];portraitLayer.fill(c[0],c[1],c[2],alpha);
    portraitLayer.rect(xx*cellW,yy*cellH,cellW+.2,cellH+.2);
  }
  displayMode=useFace?'facemesh':'center-crop';
}
function smoothstep(a,b,x){let t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
