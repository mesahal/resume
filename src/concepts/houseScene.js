import * as THREE from 'three';
import { buildInteriors } from './houseInteriors';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';
import wordScreen from './assets/word-clues.webp';
import butterflyScreen from './assets/butterfly-home.webp';

const ROOM_X = { entrance: 0, hall: -3.2, workshop: 3.2, study: 0, lounge: 0, studio: 0, porch: 0 };
const BASE_ANGLE = 0.62;
const BASE_ELEVATION = 0.5;

// Where the camera looks when an object is focused.
const FOCUS = {
  word: { at: [1.9, 1.55, 0.9], zoom: 1.25 },
  butterfly: { at: [4.7, 1.45, 0.2], zoom: 1.25 },
  accelera: { at: [3.1, 1.45, -2.6], zoom: 1.25 },
  tools: { at: [3.3, 2.1, -3.3], zoom: 1.1 },
};

/**
 * A bounded, demand-rendered miniature house with two furnished rooms (Hall and Workshop).
 * Every interaction here also exists as native HTML, so the scene is progressive enhancement.
 */
export async function createHouse(host, {
  onHotspot, onDoor, onSwitch, onTile, onSwipe, onReady, onError,
  reduced = false, night = false, room = 'entrance',
}) {
  let disposed = false, contextLost = false, frame = 0, lastTime = 0;
  let isReduced = reduced, currentRoom = room, focusId = null, mobile = false, look = 0;
  const nightTarget = { value: night ? 1 : 0 };
  const resources = new Set(), textures = new Set();

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, host.clientWidth < 700 ? 1.25 : 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction = 'pan-y';

  const camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.1, 100);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  const env = pmrem.fromScene(environment, 0.04);
  scene.environment = env.texture;
  environment.dispose();
  pmrem.dispose();

  // ---- Lights (intensities are blended between day and night values) ----
  const hemi = new THREE.HemisphereLight(0xfff3dd, 0x7779a3, 1.1);
  const key = new THREE.DirectionalLight(0xfff3db, 3.0);
  key.position.set(-4, 10, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(1536, 1536);
  Object.assign(key.shadow.camera, { left: -11, right: 11, top: 9, bottom: -9 });
  key.shadow.normalBias = 0.03;
  key.shadow.bias = -0.0001;
  const fill = new THREE.DirectionalLight(0xb6c8ff, 1.1);
  fill.position.set(5, 6, -6);
  const lampHallLight = new THREE.PointLight(0xffc77a, 0, 8, 2);
  lampHallLight.position.set(-0.7, 2.1, -2.4);
  const lampShopLight = new THREE.PointLight(0xffc77a, 0, 8, 2);
  lampShopLight.position.set(4.3, 2.0, -2.4);
  scene.add(hemi, key, fill, lampHallLight, lampShopLight);
  const dayKey = new THREE.Color(0xfff3db), nightKey = new THREE.Color(0x8fa6ff);

  // ---- Materials and helpers ----
  const mats = {};
  const material = (name, color, roughness = 0.55, metalness = 0) =>
    mats[name] || (mats[name] = new THREE.MeshStandardMaterial({ color, roughness, metalness }));
  const chalk = material('chalk', '#e9e4d5'), blue = material('blue', '#304dcc', 0.32);
  const orange = material('orange', '#f16a32', 0.35), green = material('green', '#b7c7a0');
  const pink = material('pink', '#efb1bb', 0.4), yellow = material('yellow', '#f4c25d');
  const dark = material('dark', '#192b3c', 0.3), metal = material('metal', '#b8c6d4', 0.25, 0.65);
  const wall = material('wall', '#f6f1e4', 0.8), sand = material('sand', '#ead9b8', 0.8);
  const sage = material('sage', '#d4dfc6', 0.8), wood = material('wood', '#d8a76a', 0.6);
  const lampMat = new THREE.MeshStandardMaterial({ color: '#f6dca0', roughness: 0.5, emissive: new THREE.Color('#ffcf7a'), emissiveIntensity: 0 });
  mats.lamp = lampMat;

  function mesh(geometry, mat, parent = scene, x = 0, y = 0, z = 0) {
    resources.add(geometry);
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  const box = (w, h, d, mat, parent, x, y, z, r = 0.08) =>
    mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 4, h / 4, d / 4)), mat, parent, x, y, z);
  const cylinder = (r, h, mat, parent, x, y, z) => mesh(new THREE.CylinderGeometry(r, r, h, 48), mat, parent, x, y, z);
  const font = new FontLoader().parse(fontData);
  function text(value, size, depth, mat, parent, x, y, z) {
    const geo = new TextGeometry(value, {
      font, size, depth, curveSegments: 12, bevelEnabled: true, bevelThickness: 0.009, bevelSize: 0.006, bevelSegments: 2,
    });
    return mesh(geo, mat, parent, x, y, z);
  }
  // Invisible, generous click target so small objects are easy to hit.
  const hitMaterial = new THREE.MeshBasicMaterial({ visible: false });
  function hitBox(w, h, d, parent, x, y, z) {
    const m = mesh(new THREE.BoxGeometry(w, h, d), hitMaterial, parent, x, y, z);
    m.castShadow = false;
    m.receiveShadow = false;
    return m;
  }

  const floor = mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.14 }), scene, 0, -0.47, 0);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;

  const world = new THREE.Group();
  scene.add(world);
  const hotspots = [];
  function hotspot(id, x = 0, y = 0, z = 0) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.userData.hotspot = id;
    world.add(group);
    hotspots.push(group);
    return group;
  }

  // ---- House shell: floor plate, two floors, back + left walls, low divider ----
  box(13.2, 0.3, 7.5, chalk, world, 0, -0.15, 0, 0.15);
  box(12.8, 0.1, 7.1, blue, world, 0, -0.34, 0, 0.04);
  box(6.35, 0.05, 7.0, sand, world, -3.175, 0.025, 0.0, 0.01);
  box(6.5, 0.05, 7.0, sage, world, 3.35, 0.025, 0.0, 0.01);
  box(13.2, 3.2, 0.25, wall, world, 0, 1.6, -3.625, 0.05);
  box(0.25, 3.2, 7.5, wall, world, -6.475, 1.6, 0, 0.05);
  box(0.25, 0.9, 2.7, wall, world, 0, 0.45, -2.15, 0.05);
  box(0.25, 0.9, 2.7, wall, world, 0, 0.45, 2.15, 0.05);

  // ---- The doorway between the rooms ----
  const door = hotspot('door', 0, 0, 0);
  door.rotation.y = Math.PI / 2;
  box(0.3, 1.9, 0.4, orange, door, -0.85, 0.95, 0, 0.12);
  box(0.3, 1.9, 0.4, orange, door, 0.85, 0.95, 0, 0.12);
  const arc = mesh(new THREE.TorusGeometry(0.85, 0.15, 16, 48, Math.PI), orange, door, 0, 1.9, 0);
  arc.scale.z = 1.35;
  hitBox(1.8, 2.8, 0.7, door, 0, 1.4, 0);

  // ================= HALL =================
  box(2.2, 0.12, 1.8, green, world, -5.1, 0.06, -2.2, 0.05);
  const bigS = text('S', 2.5, 0.5, blue, world, -5.75, 0.12, -2.0);
  bigS.rotation.y = 0.25;
  text('sahal.', 0.55, 0.1, blue, world, -4.0, 2.3, -3.5);
  cylinder(1.7, 0.03, pink, world, -2.7, 0.06, 1.3);
  const mat = box(1.7, 0.04, 0.95, orange, world, -3.3, 0.07, 3.0, 0.02);
  const hello = text('hello', 0.24, 0.01, chalk, world, -3.9, 0.095, 3.2);
  hello.rotation.x = -Math.PI / 2;
  mat.castShadow = false;

  // Letter tiles: a toy you can tap in order.
  const tiles = [];
  ['B', 'U', 'I', 'L', 'D'].forEach((letter, i) => {
    const group = new THREE.Group();
    group.position.set(-4.5 + i * 0.66, 0.34, 1.3 + Math.sin(i) * 0.07);
    group.rotation.set(0, (i - 2) * 0.12, (i % 2 ? 1 : -1) * 0.04);
    world.add(group);
    box(0.54, 0.55, 0.4, [orange, yellow, blue, green, pink][i], group, 0, 0, 0, 0.055);
    text(letter, 0.31, 0.012, i === 2 ? chalk : dark, group, -0.13, -0.12, 0.21);
    group.userData = { hotspot: 'tiles', tile: i, baseY: group.position.y, bounce: 0 };
    hotspots.push(group);
    tiles.push(group);
  });

  // The wall light switch.
  const lightSwitch = hotspot('switch', -1.8, 1.5, -3.46);
  box(0.42, 0.66, 0.05, chalk, lightSwitch, 0, 0, 0, 0.03);
  const toggle = box(0.12, 0.26, 0.08, orange, lightSwitch, 0, 0.12, 0.04, 0.03);
  hitBox(0.8, 1.0, 0.4, lightSwitch, 0, 0, 0.1);

  // Floor lamp (glows at night).
  cylinder(0.26, 0.06, orange, world, -0.7, 0.07, -2.9);
  cylinder(0.03, 1.9, metal, world, -0.7, 1.0, -2.9);
  mesh(new THREE.CylinderGeometry(0.22, 0.38, 0.5, 32), lampMat, world, -0.7, 2.1, -2.9).castShadow = false;

  const hallPlant = new THREE.Group();
  hallPlant.position.set(-5.7, 0, 2.6);
  world.add(hallPlant);
  cylinder(0.33, 0.52, orange, hallPlant, 0, 0.26, 0);
  [0, 1, 2, 3, 4].forEach((i) => {
    const leaf = mesh(new THREE.SphereGeometry(1, 16, 12), green, hallPlant, Math.sin(i * 2) * 0.22, 0.78 + (i % 2) * 0.25, Math.cos(i * 2) * 0.18);
    leaf.scale.set(0.13, 0.5, 0.08);
    leaf.rotation.z = Math.sin(i * 2) * 0.6;
  });

  // ================= WORKSHOP =================
  // Pegboard of tools (skills).
  const peg = document.createElement('canvas');
  peg.width = 640; peg.height = 340;
  const pctx = peg.getContext('2d');
  pctx.fillStyle = '#e4cf9f'; pctx.fillRect(0, 0, 640, 340);
  pctx.fillStyle = '#bda673';
  for (let x = 16; x < 640; x += 24) for (let y = 16; y < 340; y += 24) { pctx.beginPath(); pctx.arc(x, y, 2.6, 0, Math.PI * 2); pctx.fill(); }
  const pegTexture = new THREE.CanvasTexture(peg);
  pegTexture.colorSpace = THREE.SRGBColorSpace;
  textures.add(pegTexture);
  const tools = hotspot('tools', 3.3, 2.1, -3.44);
  box(3.7, 1.9, 0.06, new THREE.MeshStandardMaterial({ map: pegTexture, roughness: 0.8 }), tools, 0, 0, 0, 0.03);
  const toolColors = [green, orange, blue, pink, yellow];
  toolColors.forEach((c, i) => {
    const x = -1.4 + i * 0.7;
    box(0.13, 0.85, 0.07, c, tools, x, -0.05, 0.07, 0.04);
    if (i % 3 === 0) mesh(new THREE.TorusGeometry(0.17, 0.05, 12, 24), c, tools, x, 0.5, 0.07);
    else if (i % 3 === 1) box(0.42, 0.18, 0.07, c, tools, x, 0.44, 0.07, 0.05);
    else mesh(new THREE.SphereGeometry(0.17, 16, 12), c, tools, x, 0.48, 0.07);
    cylinder(0.025, 0.1, metal, tools, x, 0.76, 0.06).rotation.x = Math.PI / 2;
  });
  // Shelf with three small jars under the board.
  box(3.7, 0.08, 0.35, wood, tools, 0, -1.08, 0.18, 0.03);
  [green, orange, blue].forEach((c, i) => cylinder(0.14, 0.26, c, tools, -1.2 + i * 0.55, -0.9, 0.2));
  hitBox(3.9, 2.4, 0.7, tools, 0, -0.1, 0.25);

  // Desk, chair, lamp and the Accelera laptop.
  box(3.1, 0.14, 1.3, wood, world, 3.2, 0.95, -2.7, 0.05);
  [[-1.4, -0.55], [1.4, -0.55], [-1.4, 0.55], [1.4, 0.55]].forEach(([dx, dz]) => box(0.12, 0.9, 0.12, wood, world, 3.2 + dx, 0.45, -2.7 + dz, 0.03));
  cylinder(0.4, 0.1, green, world, 3.0, 0.58, -1.45);
  cylinder(0.07, 0.5, metal, world, 3.0, 0.3, -1.45);
  box(0.8, 0.75, 0.1, green, world, 3.0, 1.02, -1.08, 0.05);
  cylinder(0.14, 0.05, orange, world, 4.45, 1.05, -2.95);
  cylinder(0.025, 0.7, metal, world, 4.45, 1.4, -2.95);
  mesh(new THREE.CylinderGeometry(0.12, 0.26, 0.28, 32), lampMat, world, 4.45, 1.85, -2.95).castShadow = false;

  const paper = document.createElement('canvas');
  paper.width = 1024; paper.height = 650;
  const ctx = paper.getContext('2d');
  ctx.fillStyle = '#f3eddf'; ctx.fillRect(0, 0, 1024, 650);
  ctx.fillStyle = '#263f3a'; ctx.font = '24px Georgia'; ctx.fillText('A place at the table', 56, 64);
  ctx.font = '16px Arial'; ctx.fillText('MENU     OUR STORY', 740, 64); ctx.fillRect(56, 98, 912, 2);
  ctx.font = '76px Georgia'; ctx.fillText('Good food.', 56, 222); ctx.fillText('Good company.', 56, 309);
  ctx.font = '20px Arial'; ctx.fillText('A website taking shape.', 56, 386);
  ctx.fillStyle = '#cf6742'; ctx.beginPath(); ctx.arc(810, 278, 120, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f0d3aa'; ctx.beginPath(); ctx.arc(810, 278, 91, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#648063'; ctx.beginPath(); ctx.ellipse(810, 278, 67, 30, -0.7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#263f3a'; ctx.fillRect(56, 446, 215, 52);
  ctx.fillStyle = '#fff'; ctx.font = '16px Arial'; ctx.fillText('MAKE IT YOURS', 88, 480);
  ctx.fillStyle = '#a7a69a'; ctx.font = '19px Arial'; ctx.fillText('Illustrative website-builder study', 56, 600);
  const builderTexture = new THREE.CanvasTexture(paper);
  builderTexture.colorSpace = THREE.SRGBColorSpace;
  textures.add(builderTexture);

  const laptop = hotspot('accelera', 3.1, 1.02, -2.65);
  laptop.rotation.y = 0.12;
  box(1.5, 0.07, 1.0, metal, laptop, 0, 0.035, 0.12, 0.03);
  const lid = new THREE.Group();
  lid.position.set(0, 0.07, -0.38);
  lid.rotation.x = -0.2;
  laptop.add(lid);
  box(1.5, 1.0, 0.06, dark, lid, 0, 0.5, 0, 0.04);
  const screenMat = new THREE.MeshBasicMaterial({ map: builderTexture, toneMapped: false });
  mesh(new THREE.PlaneGeometry(1.4, 0.88), screenMat, lid, 0, 0.5, 0.035).castShadow = false;
  hitBox(1.7, 1.3, 1.3, laptop, 0, 0.55, 0.1);

  // Two phones on plinths carrying the real app screens.
  const loader = new THREE.TextureLoader();
  let missingTexture = false;
  function screenPanel(url, w, h, parent, x, y, z) {
    const texture = loader.load(url, () => { if (disposed) texture.dispose(); else requestRender(); }, undefined, () => {
      if (!disposed) { missingTexture = true; onError(); }
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.add(texture);
    const panel = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), parent, x, y, z);
    panel.castShadow = false;
    return panel;
  }
  function phoneExhibit(id, x, z, radius, plinthMat, url, bodyMat, tilt) {
    const group = hotspot(id, x, 0, z);
    cylinder(radius, 0.72, plinthMat, group, 0, 0.36, 0);
    cylinder(radius - 0.1, 0.07, plinthMat, group, 0, 0.755, 0);
    const phone = new THREE.Group();
    phone.scale.setScalar(0.8);
    phone.position.set(0, 1.75, 0);
    phone.rotation.set(0, -0.18, tilt);
    group.add(phone);
    box(1.1, 2.36, 0.16, bodyMat, phone, 0, 0, 0, 0.13);
    screenPanel(url, 0.98, 2.15, phone, 0, 0, 0.088);
    box(0.26, 0.05, 0.02, dark, phone, 0, 1.04, 0.1, 0.015);
    hitBox(1.4, 2.8, 1.4, group, 0, 1.75, 0);
    return group;
  }
  phoneExhibit('word', 1.9, 0.9, 0.78, green, wordScreen, dark, -0.1);
  phoneExhibit('butterfly', 4.7, 0.2, 0.68, pink, butterflyScreen, pink, 0.1);

  const shopPlant = new THREE.Group();
  shopPlant.position.set(5.8, 0, -2.8);
  world.add(shopPlant);
  cylinder(0.38, 0.6, blue, shopPlant, 0, 0.3, 0);
  [0, 1, 2, 3, 4, 5].forEach((i) => {
    const leaf = mesh(new THREE.SphereGeometry(1, 16, 12), green, shopPlant, Math.sin(i * 2.1) * 0.25, 0.95 + (i % 2) * 0.3, Math.cos(i * 2.1) * 0.2);
    leaf.scale.set(0.15, 0.6, 0.09);
    leaf.rotation.z = Math.sin(i * 2.1) * 0.55;
  });
  box(0.7, 0.4, 0.7, orange, world, 5.5, 0.2, 2.6, 0.06);
  box(0.6, 0.35, 0.6, yellow, world, 5.55, 0.575, 2.62, 0.06).rotation.y = 0.4;
  mesh(new THREE.SphereGeometry(0.28, 32, 24), metal, world, 5.5, 1.0, 2.62);

  const interiors = buildInteriors({ scene, box, mesh, cylinder, text, mats, textures, hotspot, hitBox });
  let entering = false, doorProgress = 0;
  function showRoom() {
    world.visible = ['hall', 'workshop'].includes(currentRoom);
    Object.entries(interiors.groups).forEach(([id,g]) => { g.visible = id === currentRoom; });
    if (entering) { world.visible = false; interiors.groups.entrance.visible = true; }
  }
  showRoom();

  // ---- Camera state ----
  const current = { target: new THREE.Vector3(ROOM_X[room], 1.0, 0), angle: BASE_ANGLE, zoom: 1, elevation: BASE_ELEVATION, night: nightTarget.value };
  const desired = { target: current.target.clone(), angle: BASE_ANGLE, zoom: 1, elevation: BASE_ELEVATION };

  function applyNight(mix) {
    hemi.intensity = THREE.MathUtils.lerp(1.1, 0.3, mix);
    key.intensity = THREE.MathUtils.lerp(3.0, 0.6, mix);
    key.color.copy(dayKey).lerp(nightKey, mix);
    fill.intensity = THREE.MathUtils.lerp(1.1, 0.45, mix);
    scene.environmentIntensity = THREE.MathUtils.lerp(0.55, 0.14, mix);
    lampHallLight.intensity = mix * 16;
    lampShopLight.intensity = mix * 16;
    lampMat.emissiveIntensity = mix * 2.4;
    floor.material.opacity = THREE.MathUtils.lerp(0.14, 0.3, mix);
  }
  const switchY = () => (nightTarget.value ? -0.12 : 0.12);

  function fitZoom() {
    const aspect = host.clientWidth / host.clientHeight;
    const half = mobile ? 5.3 : 4.4;
    const usable = 2 * half * aspect * (mobile ? 1 : 0.58);
    return THREE.MathUtils.clamp(usable / 10.2, 0.5, 1.25);
  }
  function setDesired() {
    const f = focusId && FOCUS[focusId];
    if (f) {
      desired.target.set(...f.at);
      desired.zoom = f.zoom * (mobile ? 1.1 : 1);
      desired.angle = 0.4;
      desired.elevation = 0.3;
    } else {
      desired.target.set(ROOM_X[currentRoom], currentRoom === 'entrance' ? 2.1 : ['hall', 'workshop'].includes(currentRoom) ? 1 : 1.5, 0);
      desired.zoom = fitZoom() * (currentRoom === 'entrance' ? .9 : 1);
      desired.angle = (currentRoom === 'entrance' ? .22 : BASE_ANGLE) + look;
      desired.elevation = currentRoom === 'entrance' ? .22 : BASE_ELEVATION;
    }
    if (isReduced) snap();
  }
  function snap() {
    current.target.copy(desired.target);
    current.angle = desired.angle;
    current.zoom = desired.zoom;
    current.elevation = desired.elevation;
    current.night = nightTarget.value;
  }

  function frameScene() {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    mobile = window.innerWidth <= 900;
    renderer.setSize(width, height, false);
    const aspect = width / height, half = mobile ? 5.3 : 4.4;
    // On desktop the text panel covers the left third, so the scene is shifted right.
    const shift = mobile ? 0 : 2 * half * aspect * 0.175;
    camera.left = -half * aspect - shift;
    camera.right = half * aspect - shift;
    camera.top = half;
    camera.bottom = -half;
    camera.updateProjectionMatrix();
    setDesired();
    requestRender();
  }

  function draw(time) {
    frame = 0;
    if (disposed || contextLost || document.hidden) return;
    const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.06);
    lastTime = time;
    if (entering) {
      doorProgress = Math.min(1, doorProgress + delta * 1.7);
      interiors.hinge.rotation.y = -doorProgress * Math.PI * .55;
      if (doorProgress >= 1 || isReduced) { entering = false; showRoom(); setDesired(); }
    }
    const blend = isReduced ? 1 : 1 - Math.exp(-delta * 4.5);
    current.target.lerp(desired.target, blend);
    current.angle = THREE.MathUtils.lerp(current.angle, desired.angle, blend);
    current.zoom = THREE.MathUtils.lerp(current.zoom, desired.zoom, blend);
    current.elevation = THREE.MathUtils.lerp(current.elevation, desired.elevation, blend);
    current.night = THREE.MathUtils.lerp(current.night, nightTarget.value, isReduced ? 1 : 1 - Math.exp(-delta * 5));
    applyNight(current.night);
    toggle.position.y = switchY();

    let bouncing = false;
    tiles.forEach((tile) => {
      const data = tile.userData;
      if (data.bounce > 0) {
        data.bounce = isReduced ? 0 : Math.max(0, data.bounce - delta * 2.4);
        tile.position.y = data.baseY + Math.sin((1 - data.bounce) * Math.PI) * 0.4;
        bouncing = bouncing || data.bounce > 0;
        if (!data.bounce) tile.position.y = data.baseY;
      }
    });

    const radius = 16;
    camera.position.set(
      current.target.x + Math.sin(current.angle) * radius,
      current.target.y + Math.sin(current.elevation) * radius,
      current.target.z + Math.cos(current.angle) * radius,
    );
    camera.lookAt(current.target);
    camera.zoom = current.zoom;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);

    if (entering || bouncing
      || current.target.distanceTo(desired.target) > 0.001
      || Math.abs(current.angle - desired.angle) > 0.0001
      || Math.abs(current.zoom - desired.zoom) > 0.0001
      || Math.abs(current.elevation - desired.elevation) > 0.0001
      || Math.abs(current.night - nightTarget.value) > 0.002) requestRender();
  }
  function requestRender() {
    if (!frame && !disposed && !contextLost && !document.hidden) frame = requestAnimationFrame(draw);
  }

  // ---- Pointer interaction ----
  const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
  function hit(event) {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hits = ray.intersectObjects(hotspots.filter(g => { let o = g; while(o) { if(!o.visible) return false; o=o.parent; } return true; }), true);
    if (!hits.length) return null;
    let item = hits[0].object;
    while (item && !item.userData.hotspot) item = item.parent;
    return item || null;
  }
  let press = null;
  function down(event) {
    if (event.button !== 0) return;
    press = { x: event.clientX, y: event.clientY, type: event.pointerType };
  }
  function move(event) {
    if (event.pointerType === 'mouse') {
      if (!focusId && !isReduced) {
        const bounds = renderer.domElement.getBoundingClientRect();
        look = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.16;
        desired.angle = (currentRoom === 'entrance' ? .22 : BASE_ANGLE) + look;
        requestRender();
      }
      renderer.domElement.style.cursor = hit(event) ? 'pointer' : 'default';
    }
  }
  function up(event) {
    if (!press) return;
    const dx = event.clientX - press.x, dy = event.clientY - press.y;
    const type = press.type;
    press = null;
    if (type !== 'mouse' && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      onSwipe(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) return;
    const item = hit(event);
    if (!item) return;
    const id = item.userData.hotspot;
    if (id === 'door' || id === 'entranceDoor') onDoor();
    else if (id === 'switch') onSwitch();
    else if (id === 'tiles') {
      if (!isReduced) item.userData.bounce = 1;
      requestRender();
      onTile(item.userData.tile);
    } else onHotspot(id);
  }
  const cancel = () => { press = null; };
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else requestRender(); };
  const lost = (event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); frame = 0; onError(); };
  const dom = renderer.domElement;
  dom.addEventListener('pointerdown', down);
  dom.addEventListener('pointermove', move);
  dom.addEventListener('pointerup', up);
  dom.addEventListener('pointercancel', cancel);
  dom.addEventListener('webglcontextlost', lost);
  document.addEventListener('visibilitychange', visibility);

  const resize = new ResizeObserver(frameScene);
  resize.observe(host);
  frameScene();
  snap();
  applyNight(current.night);
  toggle.position.y = switchY();
  cancelAnimationFrame(frame);
  frame = 0;
  draw(performance.now());
  if (!missingTexture) onReady();

  return {
    goTo(next) {
      const fromEntrance = currentRoom === 'entrance' && next === 'hall' && !isReduced;
      currentRoom = next; look = 0; focusId = null;
      entering = fromEntrance; doorProgress = 0;
      if (next === 'entrance') interiors.hinge.rotation.y = 0;
      showRoom();
      if (!entering) setDesired();
      requestRender();
    },
    focus(id) { focusId = id; if (!entering) setDesired(); requestRender(); },
    setNight(value) { nightTarget.value = value ? 1 : 0; if (isReduced) current.night = nightTarget.value; requestRender(); },
    setReduced(value) { isReduced = value; if (value) { setDesired(); snap(); } requestRender(); },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      dom.removeEventListener('pointerdown', down);
      dom.removeEventListener('pointermove', move);
      dom.removeEventListener('pointerup', up);
      dom.removeEventListener('pointercancel', cancel);
      dom.removeEventListener('webglcontextlost', lost);
      resources.forEach((r) => r.dispose());
      textures.forEach((t) => t.dispose());
      const materials = new Set([hitMaterial]);
      scene.traverse((o) => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => materials.add(m)); });
      materials.forEach((m) => m.dispose());
      key.shadow.dispose();
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      dom.remove();
    },
  };
}
