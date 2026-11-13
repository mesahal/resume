import * as THREE from 'three';

// Furnishings share the renderer's geometry and material ownership.
export function buildInteriors({ scene, box, mesh, cylinder, text, mats, textures, hotspot, hitBox }) {
  const { chalk, blue, orange, green, pink, yellow, dark, metal, wall, wood } = mats;
  const groups = {};
  function room(id, color = chalk) {
    const g = new THREE.Group(); scene.add(g); groups[id] = g;
    box(7.2, .3, 7.4, chalk, g, 0, -.15, 0, .14);
    box(6.9, .06, 7.1, color, g, 0, .02, 0);
    box(7.2, 3.3, .22, wall, g, 0, 1.65, -3.6);
    box(.22, 3.3, 7.4, wall, g, -3.5, 1.65, 0);
    box(7, .08, 7.2, blue, g, 0, -.34, 0);
    return g;
  }
  function plant(g, x, z) {
    cylinder(.35, .6, orange, g, x, .3, z);
    for (let i=0; i<5; i++) {
      const leaf=mesh(new THREE.SphereGeometry(1,12,10), green,g,x+Math.sin(i*2)*.22,1+(i%2)*.3,z+Math.cos(i*2)*.15);
      leaf.scale.set(.17,.65,.1); leaf.rotation.z=Math.sin(i*2)*.6;
    }
  }
  function label(g, title, subtitle, x, y, z, width=2.4) {
    const c=document.createElement('canvas'); c.width=1024;c.height=384;
    const ctx=c.getContext('2d');ctx.fillStyle='#f5ecd6';ctx.fillRect(0,0,1024,384);
    ctx.strokeStyle='#b99759';ctx.lineWidth=12;ctx.strokeRect(14,14,996,356);
    ctx.fillStyle='#223c39';ctx.font='bold 92px Georgia';ctx.textAlign='center';ctx.fillText(title,512,160);
    ctx.font='32px Arial';ctx.fillText(subtitle,512,250);
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.add(t);
    box(width+.08,width*.375+.08,.09,wood,g,x,y,z);
    mesh(new THREE.PlaneGeometry(width,width*.375),new THREE.MeshBasicMaterial({map:t,toneMapped:false}),g,x,y,z+.05).castShadow=false;
  }
  function books(g,x,y,z,count=7) {
    for(let i=0;i<count;i++) {
      const h=.45+(i%3)*.13;
      box(.16,h,.4,[blue,orange,green,pink,yellow][i%5],g,x+i*.19,y+h/2,z,.015);
    }
  }
  function sofa(g,x,z,color) {
    box(2.8,.55,1.1,color,g,x,.5,z,.18);
    box(2.8,1.0,.35,color,g,x,1.0,z-.55,.16);
    [-1.35,1.35].forEach(dx=>box(.35,.8,1.4,color,g,x+dx,.8,z-.05,.14));
    [-.65,.65].forEach(dx=>box(1.2,.18,.95,chalk,g,x+dx,.84,z,.08));
    [-1.1,1.1].forEach(dx=>cylinder(.08,.25,wood,g,x+dx,.13,z));
  }
  function table(g,x,z) {
    cylinder(.9,.12,wood,g,x,.64,z);[0,2,4].forEach(a=>cylinder(.055,.6,blue,g,x+Math.sin(a)*.5,.3,z+Math.cos(a)*.5));
    cylinder(.12,.2,chalk,g,x+.2,.79,z);mesh(new THREE.TorusGeometry(.09,.025,8,16),chalk,g,x+.32,.8,z);
  }
  function windowFrame(g,x,y) {
    box(1.7,1.65,.1,blue,g,x,y,-3.43);
    box(1.5,1.45,.08,pink,g,x,y,-3.35);
    box(.06,1.45,.08,chalk,g,x,y,-3.28);box(1.5,.06,.08,chalk,g,x,y,-3.28);
  }

  // Outside: solid facade, pitched roof, actual hinged door and brass-style nameplate.
  const entrance=new THREE.Group();scene.add(entrance);groups.entrance=entrance;
  box(9,.35,7.5,green,entrance,0,-.18,0,.24);
  box(6.4,3.8,3.1,wall,entrance,0,1.9,-1.2,.08);
  const roofShape=new THREE.Shape();roofShape.moveTo(-3.6,0);roofShape.lineTo(0,2.2);roofShape.lineTo(3.6,0);roofShape.closePath();
  const roof=mesh(new THREE.ExtrudeGeometry(roofShape,{depth:4,bevelEnabled:true,bevelThickness:.07,bevelSize:.06,bevelSegments:2}),blue,entrance,0,3.65,-3.1);
  roof.castShadow=true;
  // Entry porch and stepping stones.
  box(2.9,.24,1.7,chalk,entrance,-.7,.12,1.1);
  box(3.4,.15,1.2,chalk,entrance,-.7,.075,2.1);
  [0,1,2].forEach(i=>box(1.2,.06,.43,chalk,entrance,-.7,.03,2.8+i*.55));
  box(1.72,2.8,.18,wood,entrance,-.7,1.55,.43,.06);
  box(1.5,2.62,.08,dark,entrance,-.7,1.5,.54,.04);
  const hinge=new THREE.Group();hinge.position.set(-1.45,.2,.65);entrance.add(hinge);
  box(1.5,2.6,.12,orange,hinge,.75,1.3,0,.06);
  box(1.05,.85,.04,wood,hinge,.75,1.8,.08,.03);
  box(1.05,.7,.04,wood,hinge,.75,.65,.08,.03);
  mesh(new THREE.SphereGeometry(.07,16,12),metal,hinge,1.28,1.3,.13);
  const doorHit=hotspot('entranceDoor',0,0,0); entrance.add(doorHit);hitBox(1.8,2.8,.8,doorHit,-.7,1.5,.7);
  label(entrance,'Md Sahal','SOFTWARE ENGINEER II',1.93,2.25,.43,1.9);
  box(1.55,.82,.12,blue,entrance,-2.3,2.4,.44);
  box(1.37,.65,.06,pink,entrance,-2.3,2.4,.52);
  box(.06,.65,.06,chalk,entrance,-2.3,2.4,.57);
  box(1.37,.06,.06,chalk,entrance,-2.3,2.4,.57);
  plant(entrance,2.9,1.6);plant(entrance,-3.1,1.65);
  box(.9,.2,.55,blue,entrance,2,3.6,-1.8);
  text('hello.',.22,.02,dark,entrance,-1.13,.26,1.6).rotation.x=-Math.PI/2;

  const study=room('study',green);
  label(study,'The study','WORK / LEARN / REPEAT',.5,2.5,-3.43,2.8);
  box(3.3,.15,1.4,wood,study,.2,1.0,-1.5);
  [[-1.3,-.45],[1.3,-.45],[-1.3,.45],[1.3,.45]].forEach(([x,z])=>box(.12,1,.12,blue,study,x+.2,.5,z-1.5));
  box(1.6,1,.12,dark,study,.2,1.7,-1.8);
  box(1.45,.85,.03,blue,study,.2,1.7,-1.72);
  text('</>',.35,.015,chalk,study,-.27,1.57,-1.69);
  box(.1,.3,.1,metal,study,.2,1.1,-1.8);
  box(1,.04,.4,chalk,study,.2,1.1,-1.05);
  cylinder(.45,.15,pink,study,.2,.6,.1);cylinder(.06,.55,metal,study,.2,.3,.1);
  box(.9,.8,.12,pink,study,.2,1,.55,.1);
  // Three steps symbolise the career, with physical plaques.
  [-1,0,1].forEach((i)=>{box(.85,.3*(i+2),.85,[yellow,orange,blue][i+1],study,-2+i*.9,.15*(i+2),2);});
  plant(study,2.65,-2.65);
  box(1.2,.95,.6,wood,study,-2.5,.475,-1.6);
  books(study,-2.9,1,-1.6,5);

  const lounge=room('lounge',pink);
  sofa(lounge,.4,-1.8,green);table(lounge,.5,.7);cylinder(1.5,.025,chalk,lounge,.5,.05,.8);
  windowFrame(lounge,1.9,2.35);
  box(1.2,.12,.5,wood,lounge,-2.4,1.75,-3.2);
  box(1.2,.12,.5,wood,lounge,-2.4,2.7,-3.2);
  books(lounge,-2.85,1.82,-3.1,5);
  // A cup trophy with two handles.
  cylinder(.18,.1,blue,lounge,-2.4,2.85,-3.1);cylinder(.045,.2,metal,lounge,-2.4,2.98,-3.1);
  mesh(new THREE.CylinderGeometry(.25,.11,.32,24),yellow,lounge,-2.4,3.15,-3.1);
  [-.25,.25].forEach(dx=>mesh(new THREE.TorusGeometry(.13,.03,8,20),yellow,lounge,-2.4+dx,3.19,-3.1));
  plant(lounge,2.8,2.4);
  label(lounge,'Stay curious','EDUCATION & THE THINGS I LOVE',-.4,2.55,-3.43,2.4);

  const studio=room('studio',chalk);
  label(studio,'On air','STORIES BEYOND THE CODE',.2,2.7,-3.43,2.2);
  box(3.5,.16,1.3,wood,studio,0,1,-1.5);[-1.4,1.4].forEach(x=>box(.14,1,.8,blue,studio,x,.5,-1.5));
  // Cinema camera, lens and tripod.
  box(1.2,.8,.8,dark,studio,1.5,1.9,1.1,.1);
  const lens=cylinder(.27,.6,metal,studio,1.5,1.9,1.65);lens.rotation.x=Math.PI/2;
  const glass=cylinder(.21,.04,blue,studio,1.5,1.9,1.98);glass.rotation.x=Math.PI/2;
  [0,2.1,4.2].forEach(a=>{const leg=cylinder(.035,1.7,metal,studio,1.5+Math.sin(a)*.28,.87,1.1+Math.cos(a)*.28);leg.rotation.z=Math.sin(a)*.35;leg.rotation.x=Math.cos(a)*.35;});
  [-.3,.3].forEach(dx=>{const reel=cylinder(.33,.14,blue,studio,1.5+dx,2.5,1.1);reel.rotation.x=Math.PI/2;});
  box(1.8,1.1,.12,dark,studio,.6,1.7,-1.8);box(1.62,.92,.02,pink,studio,.6,1.7,-1.72);
  const play=new THREE.Shape();play.moveTo(0,0);play.lineTo(0,.4);play.lineTo(.35,.2);play.closePath();mesh(new THREE.ShapeGeometry(play),blue,studio,.5,1.5,-1.69);
  books(studio,-1.4,1.1,-1.55,4);
  cylinder(.08,.65,metal,studio,-.5,1.5,-.95);mesh(new THREE.CapsuleGeometry(.13,.3,4,12),dark,studio,-.5,1.9,-.95);
  plant(studio,-2.8,2.1);

  const porch=room('porch',green);
  // Open pergola rather than a closed back wall.
  porch.children[2].visible=false;porch.children[3].visible=false;
  [-3,3].forEach(x=>[-2.8,2.8].forEach(z=>box(.14,3.8,.14,wood,porch,x,1.9,z)));
  for(let x=-3;x<=3;x+=1) box(.12,.14,6.1,wood,porch,x,3.8,0);
  box(6.2,.16,.18,wood,porch,0,3.75,-2.8);box(6.2,.16,.18,wood,porch,0,3.75,2.8);
  sofa(porch,-.8,-1.6,pink);table(porch,.2,1.1);
  plant(porch,2.6,-2.5);plant(porch,-2.8,2.3);
  // Two cups: an invitation to collaborate.
  cylinder(.12,.2,orange,porch,-.15,.79,1.2);
  label(porch,"Let's build",'SOMETHING GOOD TOGETHER',0,2.7,-2.8,2.7);
  for(let i=0;i<7;i++) {cylinder(.015,.22,metal,porch,-2.7+i*.9,3.5,-2.8);mesh(new THREE.SphereGeometry(.08,12,10),yellow,porch,-2.7+i*.9,3.35,-2.8);}

  return { groups, hinge };
}
