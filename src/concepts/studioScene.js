import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';
import wordScreen from './assets/word-clues.webp';
import butterflyScreen from './assets/butterfly-home.webp';

// A bounded, demand-rendered scene. All project controls also exist as native HTML.
export async function createStudio(host,{onSelect,onReady,onError,reduced=false}) {
  let disposed=false,contextLost=false,frame=0,drag=null,selected=null,rotation=.62,lastTime=0;
  let isReduced=reduced;
  const resources=new Set(), textures=new Set();
  const scene=new THREE.Scene();
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,host.clientWidth<700?1.25:1.5));
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
  host.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction='pan-y';
  const camera=new THREE.OrthographicCamera(-10,10,5,-5,.1,100);
  const pmrem=new THREE.PMREMGenerator(renderer), environment=new RoomEnvironment();
  const env=pmrem.fromScene(environment,.04);scene.environment=env.texture;scene.environmentIntensity=.55;
  environment.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfff3dd,0x7779a3,1.1));
  const key=new THREE.DirectionalLight(0xfff3db,3.0);key.position.set(-4,10,8);key.castShadow=true;key.shadow.mapSize.set(1536,1536);key.shadow.camera.left=-9;key.shadow.camera.right=9;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.03;key.shadow.bias=-.0001;scene.add(key);
  const fill=new THREE.DirectionalLight(0xb6c8ff,1.1);fill.position.set(5,6,-6);scene.add(fill);
  const mats={};
  function material(name,color,roughness=.55,metalness=0){return mats[name]||(mats[name]=new THREE.MeshStandardMaterial({color,roughness,metalness}));}
  const chalk=material('chalk','#e9e4d5'), blue=material('blue','#304dcc',.32), orange=material('orange','#f16a32',.35), green=material('green','#b7c7a0'), pink=material('pink','#efb1bb',.4), yellow=material('yellow','#f4c25d'), dark=material('dark','#192b3c',.3), metal=material('metal','#b8c6d4',.25,.65);
  function mesh(geometry,mat,parent=scene,x=0,y=0,z=0){resources.add(geometry);const object=new THREE.Mesh(geometry,mat);object.position.set(x,y,z);object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;}
  function box(w,h,d,mat,parent,x,y,z,r=.08){return mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/4,h/4,d/4)),mat,parent,x,y,z);}
  function cylinder(r,h,mat,parent,x,y,z){return mesh(new THREE.CylinderGeometry(r,r,h,64),mat,parent,x,y,z);}
  const floor=mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.14}),scene,0,-.46,0);floor.rotation.x=-Math.PI/2;floor.castShadow=false;
  const world=new THREE.Group();scene.add(world);
  const roomBase=box(10.7,.4,6.6,chalk,world,0,-.2,0,.18);
  // A lower cobalt edge makes the model feel like a physical object.
  const roomEdge=box(10.3,.12,6.2,blue,world,0,-.43,0,.04);
  const font=new FontLoader().parse(fontData);
  function text(value,size,depth,mat,parent,x,y,z){const geo=new TextGeometry(value,{font,size,depth,curveSegments:14,bevelEnabled:true,bevelThickness:.009,bevelSize:.006,bevelSegments:2});return mesh(geo,mat,parent,x,y,z);}
  const roomName=text('sahal.',.43,.04,blue,world,-4.5,-.18,3.32);
  // Curved architectural threshold; it frames the phone exhibit, not a network graph.
  const arch=new THREE.Group();arch.position.set(2.75,.03,-1.8);world.add(arch);
  box(.38,2.9,.48,orange,arch,-1.15,1.45,0,.13);box(.38,2.9,.48,orange,arch,1.15,1.45,0,.13);
  const curve=mesh(new THREE.TorusGeometry(1.15,.19,16,64,Math.PI),orange,arch,0,2.9,0);curve.scale.z=1.28;
  const roomS=text('S',3.5,.55,blue,world,-4.25,.05,-2.25);roomS.rotation.y=.12;
  // Three exhibits with independent hit targets.
  const exhibits={};
  function exhibit(id,x,z){const group=new THREE.Group();group.position.set(x,0,z);group.userData.project=id;world.add(group);exhibits[id]=group;return group;}
  const word=exhibit('word',-.15,1.25), butterfly=exhibit('butterfly',2.75,-.8), accelera=exhibit('accelera',-3,-.45);
  cylinder(1.52,.45,green,word,0,.225,0);cylinder(1.42,.09,green,word,0,.495,0);
  cylinder(1.02,.72,pink,butterfly,0,.36,0);cylinder(.91,.07,pink,butterfly,0,.755,0);
  box(2.7,.25,1.75,blue,accelera,0,.125,0,.1);box(2.5,.16,1.62,blue,accelera,0,.32,0,.07);
  const loader=new THREE.TextureLoader();
  let missingTexture=false;
  function screen(url,w,h,parent,x,y,z){const texture=loader.load(url,()=>{if(disposed){texture.dispose();return;}requestRender();},undefined,()=>{if(!disposed){missingTexture=true;onError();}});texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.add(texture);const mat=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});const panel=mesh(new THREE.PlaneGeometry(w,h),mat,parent,x,y,z);panel.castShadow=false;return panel;}
  function phone(parent,url,bodyMat,y,tilt){const group=new THREE.Group();parent.add(group);group.position.set(0,y,0);group.rotation.z=tilt;group.rotation.y=-.12;box(1.1,2.36,.16,bodyMat,group,0,0,0,.13);screen(url,.98,2.15,group,0,0,.088);box(.26,.05,.02,dark,group,0,1.04,.1,.015);return group;}
  phone(word,wordScreen,dark,1.96,-.12);
  phone(butterfly,butterflyScreen,pink,2.05,.12);
  // Original builder sketch, intentionally not a private platform screenshot.
  const paper=document.createElement('canvas');paper.width=1024;paper.height=650;const ctx=paper.getContext('2d');
  ctx.fillStyle='#f3eddf';ctx.fillRect(0,0,1024,650);ctx.fillStyle='#263f3a';ctx.font='24px Georgia';ctx.fillText('A place at the table',56,64);ctx.font='16px Arial';ctx.fillText('MENU     OUR STORY',740,64);ctx.fillRect(56,98,912,2);ctx.font='76px Georgia';ctx.fillText('Good food.',56,222);ctx.fillText('Good company.',56,309);ctx.font='20px Arial';ctx.fillText('A website taking shape.',56,386);ctx.fillStyle='#cf6742';ctx.beginPath();ctx.arc(810,278,120,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f0d3aa';ctx.beginPath();ctx.arc(810,278,91,0,Math.PI*2);ctx.fill();ctx.fillStyle='#648063';ctx.beginPath();ctx.ellipse(810,278,67,30,-.7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#263f3a';ctx.fillRect(56,446,215,52);ctx.fillStyle='#fff';ctx.font='16px Arial';ctx.fillText('MAKE IT YOURS',88,480);ctx.fillStyle='#a7a69a';ctx.font='19px Arial';ctx.fillText('Illustrative website-builder study',56,600);
  const builderTexture=new THREE.CanvasTexture(paper);builderTexture.colorSpace=THREE.SRGBColorSpace;textures.add(builderTexture);
  const laptop=new THREE.Group();laptop.rotation.y=.2;accelera.add(laptop);
  box(2.4,1.6,.12,dark,laptop,0,1.4,-.25,.09);
  const screenMat=new THREE.MeshBasicMaterial({map:builderTexture,toneMapped:false});mesh(new THREE.PlaneGeometry(2.25,1.43),screenMat,laptop,0,1.41,-.182);
  box(2.4,.1,1.25,metal,laptop,0,.62,.27,.05);
  for(let r=0;r<4;r++)for(let c=0;c<11;c++)box(.145,.025,.105,dark,laptop,-.9+c*.18,.685,-.12+r*.15,.01);
  box(.7,.015,.22,metal,laptop,0,.683,.7,.02);
  // Word tiles are tangible hints of the independent game.
  const tiles=[];
  ['B','U','I','L','D'].forEach((letter,i)=>{const g=new THREE.Group();world.add(g);g.position.set(-1.8+i*.65,.25,2.65+Math.sin(i)*.07);g.rotation.y=(i-2)*.12;g.rotation.z=(i%2?1:-1)*.04;box(.54,.55,.4,[orange,yellow,blue,green,pink][i],g,0,0,0,.055);text(letter,.31,.012,i===2?chalk:dark,g,-.13,-.12,.21);g.userData.project='word';tiles.push(g);});
  // A sculptural mechanical detail and plant lend the room scale and warmth.
  const ornament=mesh(new THREE.SphereGeometry(.31,32,24),metal,world,4.45,.36,1.75);
  const ornamentBase=cylinder(.46,.12,orange,world,4.45,.08,1.75);
  const plant=new THREE.Group();plant.position.set(-4.65,.0,1.5);world.add(plant);cylinder(.33,.52,orange,plant,0,.26,0);
  [0,1,2,3,4].forEach(i=>{const leaf=mesh(new THREE.SphereGeometry(1,16,12),green,plant,Math.sin(i*2)*.22,.75+(i%2)*.25,Math.cos(i*2)*.18);leaf.scale.set(.13,.5,.08);leaf.rotation.z=Math.sin(i*2)*.6;});
  const targets={word:new THREE.Vector3(-.15,1.65,1.25),butterfly:new THREE.Vector3(2.75,1.95,-.8),accelera:new THREE.Vector3(-3,1.45,-.45)};
  const current={target:new THREE.Vector3(-1.7,1.1,0),angle:1.02,zoom:.88,elevation:.6};
  const desired={target:current.target.clone(),angle:rotation,zoom:1,elevation:.5};
  let mobile=false;
  function frameScene(){const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;mobile=window.innerWidth<=900;renderer.setSize(width,height,false);const aspect=width/height;const half=mobile?5.3:4.4;camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();setTarget(selected);requestRender();}
  function setTarget(id){selected=id;
    Object.entries(exhibits).forEach(([key,g])=>{g.visible=!id || key===id;});
    roomBase.visible=!id;roomEdge.visible=!id;roomName.visible=!id;floor.position.y=id?-.01:-.46;roomS.visible=!id;plant.visible=!id;ornament.visible=!id;ornamentBase.visible=!id;arch.visible=!id || id==='butterfly';tiles.forEach(g=>{g.visible=!id || id==='word';});// Camera rotation is bounded independently of the selected project.
    if(id && targets[id]){desired.target.copy(targets[id]);if(!mobile)desired.target.x-=1.35;desired.zoom=mobile?1.9:1.7;desired.angle=.16;desired.elevation=.17;}
    else{desired.target.set(mobile?0:-1.9,1.35,0);desired.zoom=mobile ? Math.min(1.45,.65*host.clientWidth/host.clientHeight) : Math.min(1,host.clientWidth/host.clientHeight/1.7);desired.angle=rotation;desired.elevation=.5;}
    if(isReduced){current.target.copy(desired.target);current.angle=desired.angle;current.zoom=desired.zoom;current.elevation=desired.elevation;}
    requestRender();
  }
  function draw(time){frame=0;if(disposed||contextLost||document.hidden)return;const delta=Math.min((time-lastTime)/1000||.016,.06);lastTime=time;const blend=isReduced?1:1-Math.exp(-delta*5.5);current.target.lerp(desired.target,blend);current.angle=THREE.MathUtils.lerp(current.angle,desired.angle,blend);current.zoom=THREE.MathUtils.lerp(current.zoom,desired.zoom,blend);current.elevation=THREE.MathUtils.lerp(current.elevation,desired.elevation,blend);
    const radius=16;camera.position.set(current.target.x+Math.sin(current.angle)*radius,current.target.y+Math.sin(current.elevation)*radius,current.target.z+Math.cos(current.angle)*radius);camera.lookAt(current.target);camera.zoom=current.zoom;camera.updateProjectionMatrix();renderer.render(scene,camera);
    if(current.target.distanceTo(desired.target)>.001||Math.abs(current.angle-desired.angle)>.0001||Math.abs(current.zoom-desired.zoom)>.0001||Math.abs(current.elevation-desired.elevation)>.0001)requestRender();
  }
  function requestRender(){if(!frame&&!disposed&&!contextLost&&!document.hidden)frame=requestAnimationFrame(draw);}
  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
  function hit(event){const bounds=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-bounds.left)/bounds.width*2-1,-(event.clientY-bounds.top)/bounds.height*2+1);ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects([...Object.values(exhibits),...tiles].filter(g=>g.visible),true);if(!hits.length)return null;let item=hits[0].object;while(item&&!item.userData.project)item=item.parent;return item?.userData.project;}
  function down(e){if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,last:e.clientX,moved:false};renderer.domElement.setPointerCapture(e.pointerId);}
  function move(e){if(drag){if(Math.abs(e.clientX-drag.x)>5)drag.moved=true;if(drag.moved){const amount=(e.clientX-drag.last)*.005;desired.angle=THREE.MathUtils.clamp(desired.angle+amount,-.7,1.3);rotation=desired.angle;if(isReduced)current.angle=desired.angle;requestRender();}drag.last=e.clientX;}else renderer.domElement.style.cursor=hit(e)?'pointer':'grab';}
  function up(e){if(drag&&!drag.moved&&Math.abs(e.clientY-drag.y)<7){const id=hit(e);if(id)onSelect(id);}drag=null;if(renderer.domElement.hasPointerCapture(e.pointerId))renderer.domElement.releasePointerCapture(e.pointerId);}
  function cancel(){drag=null;}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestRender();}
  function lost(e){e.preventDefault();contextLost=true;cancelAnimationFrame(frame);frame=0;onError();}
  renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',cancel);renderer.domElement.addEventListener('webglcontextlost',lost);document.addEventListener('visibilitychange',visibility);
  const resize=new ResizeObserver(frameScene);resize.observe(host);frameScene();
  // First frame is an actual render; texture failures preserve the native project paths.
  cancelAnimationFrame(frame);frame=0;draw(performance.now());if(!missingTexture)onReady();
  return {
    select:setTarget,
    rotate(amount){desired.angle=THREE.MathUtils.clamp(desired.angle+amount,-.7,1.3);rotation=desired.angle;if(isReduced)current.angle=desired.angle;requestRender();},
    setReduced(value){isReduced=value;if(value){current.target.copy(desired.target);current.angle=desired.angle;current.zoom=desired.zoom;current.elevation=desired.elevation;}requestRender();},
    dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);resize.disconnect();document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointercancel',cancel);renderer.domElement.removeEventListener('webglcontextlost',lost);resources.forEach(r=>r.dispose());textures.forEach(t=>t.dispose());const materials=new Set();scene.traverse(o=>{if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));}});materials.forEach(m=>m.dispose());key.shadow.dispose();env.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();},
  };
}
