import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Activity, ArrowDown, ArrowRight, BarChart3, BatteryCharging, BrainCircuit, Building2, Check, ChevronDown, Cloud, Cpu, Database, Droplets, Factory, Flame, Gauge, Globe2, Leaf, Menu, Radio, Recycle, RotateCcw, Server, ShieldCheck, Sparkles, Wifi, Wind, X, Zap } from 'lucide-react';
import {referenceData} from './reference-data.js';
import {translate,localizeMetric} from './i18n.js';
import ReadingDemo from './ReadingDemo.jsx';
import AiRecommendation from './AiRecommendation.jsx';
import NationalConnections from './NationalConnections.jsx';
import TeamPage from './TeamPage.jsx';
import './style.css';

const modules = [
  { id: 'enerji', name: 'Enerji', short: 'Enerji Yönetimi', color: '#9ddf5f', dark: '#438d35', Icon: Zap, metric: '1.245 kWh', label: 'günlük kaynak değeri', bullets: ['Tüketim izleme', 'Verimlilik analizi', 'Akıllı öneriler'], detail: 'Akıllı sayaç ve sensör verileri tek merkezde toplanır. Yapay zekâ tüketim eğilimlerini yorumlayarak tasarruf fırsatlarını görünür kılar.' },
  { id: 'su', name: 'Su', short: 'Su Yönetimi', color: '#70d4fc', dark: '#168ac4', Icon: Droplets, metric: '85 m³', label: 'günlük kaynak değeri', bullets: ['Uzaktan okuma', 'Kaçak tespiti', 'Tasarruf önerileri'], detail: 'Mekanik sayaçlar ESP32-CAM ve OCR ile dijitalleşir; akış anomalileri ve olası kaçaklar izlenir.' },
  { id: 'dogalgaz', name: 'Doğalgaz', short: 'Doğalgaz Yönetimi', color: '#ffc078', dark: '#ec8129', Icon: Flame, metric: '640 m³', label: 'kaynak panel tüketimi', bullets: ['Tüketim izleme', 'Güvenlik uyarıları', 'Verimlilik'], detail: 'Doğalgaz sayaçları ve gaz sensörleri tüketim ile güvenlik sinyallerini tek panelde birleştirir.' },
  { id: 'atik', name: 'Atık', short: 'Atık Yönetimi', color: '#70e5c5', dark: '#13a990', Icon: Recycle, metric: '42 kg', label: 'günlük kaynak değeri', bullets: ['Doluluk takibi', 'Ayrıştırma analizi', 'Geri dönüşüm'], detail: 'Akıllı kutular doluluk verisini paylaşır. Toplama rotaları ve ayrıştırma performansı birlikte değerlendirilir.' },
  { id: 'karbon', name: 'Karbon', short: 'Karbon Yönetimi', color: '#c8a4f4', dark: '#8051bd', Icon: Cloud, metric: '320 kg CO₂e', label: 'günlük kaynak değeri', bullets: ['CO₂e hesaplama', 'Senaryo analizi', 'Raporlama'], detail: 'Enerji, su, atık ve doğalgaz verileri karbon ayak izi görünümüne dönüşür; senaryolar karşılaştırılabilir.' }
];

const buildings = [
  {x: -5.5,z:-3.7,w:2.4,d:2,h:1.7,roof:'#c7ecfb',name:'Elektronik Atölyesi',type:'enerji'},
  {x: 0,z:-4.1,w:3.8,d:2.7,h:3.15,roof:'#c3e4ef',name:'Boğazlıyan MYO Ana Bina',type:'su'},
  {x: 5.4,z:-3.5,w:2.5,d:2,h:1.85,roof:'#cde9ed',name:'Gıda Laboratuvarı',type:'karbon'},
  {x:-4.9,z:2.4,w:2.9,d:2.1,h:1.55,roof:'#c9e8dc',name:'Atık Ayrıştırma Noktası',type:'atik'},
  {x:0,z:2.4,w:3.5,d:2.1,h:1.55,roof:'#e3ecf1',name:'Bilgisayar Laboratuvarı',type:'enerji'},
  {x:5.2,z:2.6,w:2.4,d:2,h:1.7,roof:'#d0e4ef',name:'Isı ve Gaz Ölçüm Noktası',type:'dogalgaz'}
];

function CampusScene({ active, onSelect, language }) {
  const containerRef = useRef(null);
  const labelsRef = useRef(null);
  const [unsupported, setUnsupported] = useState(false);
  const activeRef = useRef(active);
  const onSelectRef = useRef(onSelect);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);
  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#d8f2df');
    scene.fog = new THREE.Fog('#d8f2df', 27, 48);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(16, 17, 19);
    camera.lookAt(0, 0, 0);
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' }); }
    catch { setUnsupported(true); return; }
    const compact = window.matchMedia('(max-width: 680px)').matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    host.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.domElement.style.touchAction = 'pan-y';
    controls.enableDamping = true;
    controls.dampingFactor = .07;
    controls.minDistance = 15;
    controls.maxDistance = 35;
    controls.maxPolarAngle = Math.PI / 2.45;
    controls.minPolarAngle = .48;
    controls.enablePan = false;
    controls.target.set(0, .25, 0);
    scene.add(new THREE.HemisphereLight('#f3ffff', '#9cbec5', 2.2));
    const sun = new THREE.DirectionalLight('#fff5d6', 3.2);
    sun.position.set(-8, 18, 11);
    sun.castShadow = true;
    sun.shadow.mapSize.set(compact ? 1024 : 2048, compact ? 1024 : 2048);
    sun.shadow.camera.left = -18; sun.shadow.camera.right = 18; sun.shadow.camera.top = 18; sun.shadow.camera.bottom = -18;
    sun.shadow.bias = -.0005;
    scene.add(sun);
    const mat = (color, roughness=.8, metalness=0) => new THREE.MeshStandardMaterial({color, roughness, metalness});
    const box = (w,h,d,x,y,z,material,cast=true) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
      mesh.position.set(x,y,z); mesh.castShadow=cast; mesh.receiveShadow=true; scene.add(mesh); return mesh;
    };
    box(17.2,.46,13.7,0,-.3,0,mat('#b9d9ca'));
    box(16.8,.08,13.3,0,-.02,0,mat('#7bd389'),false);
    const roadMat=mat('#677d83'); const edgeMat=mat('#e1e4d2');
    box(16.6,.035,1.15,0,.055,0,roadMat,false);
    box(1.15,.035,13.1,0,.055,0,roadMat,false);
    box(16.6,.02,.06,0,.077,-.62,edgeMat,false); box(16.6,.02,.06,0,.077,.62,edgeMat,false);
    box(.06,.02,13.1,-.62,.077,0,edgeMat,false); box(.06,.02,13.1,.62,.077,0,edgeMat,false);
    const windowMat=mat('#8ed7e5',.25,.1); const wallMat=mat('#f2f1e7'); const trimMat=mat('#90aeb2');
    const hitTargets=[]; const beacons=[];
    buildings.forEach((b,i)=>{
      const main=box(b.w,b.h,b.d,b.x,b.h/2+.08,b.z,wallMat); main.userData={type:b.type,name:b.name}; hitTargets.push(main);
      box(b.w+.18,.16,b.d+.2,b.x,b.h+.19,b.z,mat(b.roof));
      box(b.w+.08,.10,b.d+.1,b.x,.14,b.z,trimMat);
      for(let f=0;f<(b.h>2.6?3:2);f++){
        for(let c=-1;c<=1;c++){
          const wx=b.x+c*b.w*.29; const wy=.56+f*.63;
          box(b.w*.18,.34,.025,wx,wy,b.z+b.d/2+.016,windowMat,false);
          box(b.w*.18,.34,.025,wx,wy,b.z-b.d/2-.016,windowMat,false);
        }
      }
      for(let c=-1;c<=1;c++) box(.025,.32,b.d*.16,b.x+b.w/2+.015,.73,b.z+c*b.d*.29,windowMat,false);
      const solar=mat('#245f81',.25,.25);
      for(let s=-1;s<=1;s++) box(.32,.025,.49,b.x+s*.43,b.h+.29,b.z-.19,solar,false);
      if(i===1){
        const sign=document.createElement('canvas');sign.width=512;sign.height=96;
        const ctx=sign.getContext('2d');ctx.fillStyle='#073e57';ctx.fillRect(0,0,512,96);ctx.fillStyle='#ffffff';ctx.font='bold 37px Arial';ctx.textAlign='center';ctx.fillText('BOĞAZLIYAN MYO',256,61);
        const signTexture=new THREE.CanvasTexture(sign);signTexture.colorSpace=THREE.SRGBColorSpace;
        const plaque=new THREE.Mesh(new THREE.PlaneGeometry(2.18,.41),new THREE.MeshBasicMaterial({map:signTexture}));plaque.position.set(b.x,b.h-.25,b.z+b.d/2+.035);scene.add(plaque);
        box(.72,.87,.1,b.x,.52,b.z+b.d/2+.09,mat('#2f8ca2',.3,.2),false);
        box(1.15,.08,.55,b.x,.06,b.z+b.d/2+.35,mat('#d9e2d5'),false);
      }
      const beaconGroup = new THREE.Group(); beaconGroup.position.set(b.x,b.h+1.22,b.z);
      const bm = new THREE.MeshStandardMaterial({color:'#43d2d2',emissive:'#28c5c1',emissiveIntensity:.4,metalness:.2,roughness:.3});
      const sphere=new THREE.Mesh(new THREE.SphereGeometry(.27,20,16),bm); beaconGroup.add(sphere);
      const halo=new THREE.Mesh(new THREE.TorusGeometry(.39,.026,8,32),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.8})); halo.rotation.x=Math.PI/2; beaconGroup.add(halo);
      const stem=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.55,6),mat('#30a7ac')); stem.position.y=-.45; beaconGroup.add(stem);
      beaconGroup.userData={type:b.type,name:b.name}; scene.add(beaconGroup); hitTargets.push(sphere); beacons.push({group:beaconGroup,sphere,halo,type:b.type,index:i});
    });
    const trunkMat=mat('#687c57'); const leafMats=[mat('#53a875'),mat('#72bc81'),mat('#438c72'),mat('#a4d184')];
    const treePoints=[[-7,-5.6],[-6,-5.5],[-3,-5.8],[2,-5.7],[4.2,-5.9],[7,-5.5],[-7,5.5],[-5.9,5.45],[-3.3,5.55],[2.4,5.6],[4,5.5],[6.8,5.45],[-7,-1.5],[7,1.2],[-3.3,1.4],[3.1,1.3],[-1.6,-2],[2,-2]];
    treePoints.forEach(([x,z],i)=>{
      const t=new THREE.Mesh(new THREE.CylinderGeometry(.07,.1,.47,7),trunkMat); t.position.set(x,.28,z); t.castShadow=true; scene.add(t);
      const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.43+(i%3)*.08,1),leafMats[i%4]); crown.position.set(x,.72+(i%3)*.04,z); crown.castShadow=true; scene.add(crown);
    });
    // Proposed sustainability elements give the MYO concept model a clear campus identity.
    const tankMat=mat('#66b6cc',.24,.5);const binColors=['#188c61','#238bb9','#e8b33b'];
    const tank=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.58,24),tankMat);tank.position.set(7.1,.33,3.2);tank.castShadow=true;scene.add(tank);
    const tankCap=new THREE.Mesh(new THREE.CylinderGeometry(.44,.44,.07,24),mat('#d7eff4'));tankCap.position.set(7.1,.66,3.2);scene.add(tankCap);
    binColors.forEach((color,i)=>box(.26,.42,.26,-7.4+i*.34,.24,2.5,mat(color),false));
    const gardenMat=mat('#a0d977');
    for(let i=0;i<5;i++)box(.68,.08,.42,-6.9+i*.55,.12,4.7,gardenMat,false);
    const lineMat=new THREE.LineBasicMaterial({color:'#1bb8ca',transparent:true,opacity:.55});
    [[-5.5,-3.7,0,-4.1],[0,-4.1,5.4,-3.5],[-4.9,2.4,0,2.4],[0,2.4,5.2,2.6],[0,-4.1,0,2.4]].forEach(v=>{
      const pts=[new THREE.Vector3(v[0],.18,v[1]),new THREE.Vector3(v[2],.18,v[3])]; scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),lineMat));
    });
    const grid = new THREE.GridHelper(17,17,'#e8f9f5','#e8f9f5'); grid.position.y=.008; grid.material.opacity=.2; grid.material.transparent=true; scene.add(grid);
    const raycaster=new THREE.Raycaster(); const mouse=new THREE.Vector2();
    const pointerMove=e=>{const rect=renderer.domElement.getBoundingClientRect();mouse.set(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(mouse,camera);renderer.domElement.style.cursor=raycaster.intersectObjects(hitTargets).length?'pointer':'grab';};
    const pointerClick=e=>{const rect=renderer.domElement.getBoundingClientRect();mouse.set(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(hitTargets);if(hits.length){const data=hits[0].object.userData.type?hits[0].object.userData:hits[0].object.parent.userData;onSelectRef.current?.(data.type);}};
    renderer.domElement.addEventListener('pointermove',pointerMove); renderer.domElement.addEventListener('click',pointerClick);
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);};
    const ro=new ResizeObserver(resize);ro.observe(host);resize();
    let frame=0,raf,visible=true; const point=new THREE.Vector3();
    const visibility=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting ?? true},{rootMargin:'100px'});visibility.observe(host);
    const contextLost=e=>{e.preventDefault();setUnsupported(true)};
    renderer.domElement.addEventListener('webglcontextlost',contextLost);
    const animate=()=>{raf=requestAnimationFrame(animate);if(document.hidden||!visible)return;frame+=.015;controls.update();beacons.forEach(b=>{const selected=activeRef.current===b.type;b.sphere.material.color.set(selected?'#fff1a8':'#43d2d2');b.sphere.material.emissive.set(selected?'#ffbb32':'#28c5c1');b.group.position.y=buildings[b.index].h+1.22+Math.sin(frame+b.index)*.07;b.halo.scale.setScalar(selected?1.18:1);});
      const labels=labelsRef.current?.children;if(labels){const shifts=[-16,55,18,-22,-5,12];const inset=host.clientWidth<500?57:74;buildings.forEach((b,i)=>{const label=labels[i];point.set(b.x,b.h+1.75,b.z).project(camera);const x=(point.x*.5+.5)*host.clientWidth+shifts[i];label.style.left=`${Math.max(inset,Math.min(host.clientWidth-inset,x))}px`;label.style.top=`${(-point.y*.5+.5)*host.clientHeight}px`;label.style.opacity=point.z<1?'1':'0';});}
      renderer.render(scene,camera);};animate();
    return ()=>{cancelAnimationFrame(raf);visibility.disconnect();ro.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointermove',pointerMove);renderer.domElement.removeEventListener('click',pointerClick);renderer.domElement.removeEventListener('webglcontextlost',contextLost);host.removeChild(renderer.domElement);renderer.dispose();scene.traverse(obj=>{if(obj.geometry)obj.geometry.dispose();if(obj.material){(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>m.dispose());}});};
  },[]);
  return <div className="campus-render"><div className="campus-canvas" ref={containerRef} aria-label={translate('Etkileşimli üç boyutlu akıllı kampüs modeli',language)}/>{unsupported&&<div className="scene-fallback" role="status"><Building2 size={34}/><strong>{translate('3D görünüm bu cihazda açılamadı.',language)}</strong><span>{translate('Kaynakları aşağıdaki kartlardan inceleyebilirsiniz.',language)}</span></div>}<div className="building-infographics" ref={labelsRef}>{buildings.map((b,i)=>{const m=modules.find(item=>item.id===b.type);const Icon=m.Icon;return <button className={`building-tag ${active===b.type?'active':''}`} key={`${b.name}-${i}`} onClick={()=>onSelect(b.type)} style={{'--tag-color':m.color,'--tag-dark':m.dark}} aria-label={`${translate(b.name,language)}: ${localizeMetric(m.metric,language)}`}><span className="building-tag-icon"><Icon size={13}/></span><span className="building-tag-copy"><strong>{translate(b.name,language)}</strong><small>{localizeMetric(m.metric,language)}</small></span></button>})}</div></div>;
}

function BrandMark({language}){return <img className="brand-mark" src="/bozok-logo.png" alt={language==='en'?'Yozgat Bozok University logo':'Yozgat Bozok Üniversitesi logosu'}/>}
function DeviceScene({language}){
  const mountRef=useRef(null);
  const [visible,setVisible]=useState(false);
  const [unsupported,setUnsupported]=useState(false);
  useEffect(()=>{const mount=mountRef.current;if(!mount)return;const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)setVisible(true)},{rootMargin:'250px'});observer.observe(mount);return()=>observer.disconnect()},[]);
  useEffect(()=>{
    const mount=mountRef.current;if(!mount||!visible)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(35,1,.1,50);camera.position.set(4.6,4.2,7.8);camera.lookAt(0,.5,0);
    let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'})}catch{setUnsupported(true);return}renderer.setPixelRatio(Math.min(devicePixelRatio,window.matchMedia('(max-width: 680px)').matches?1.5:2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.6;mount.appendChild(renderer.domElement);
    const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.5;controls.maxPolarAngle=1.35;controls.target.set(0,.45,0);
    renderer.domElement.style.touchAction='pan-y';
    scene.add(new THREE.HemisphereLight('#ffffff','#8bbfc3',2.4));const key=new THREE.DirectionalLight('#ffffff',3);key.position.set(-4,8,6);key.castShadow=true;scene.add(key);
    const material=(color,metalness=0,roughness=.55)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
    const add=(geo,mat,x,y,z,rot)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);if(rot)mesh.rotation.set(...rot);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);return mesh};
    const silver=material('#dbe9ea',.55,.3),steel=material('#6e9caa',.65,.3),dark=material('#123f52',.4,.35),cyan=material('#65d6e5',.2,.3);
    add(new THREE.BoxGeometry(5.8,.09,2.4),material('#e5f6f7'),0,-.07,0);
    // Mechanical water meter: metal pipe, cylindrical housing and a printed dial.
    add(new THREE.CylinderGeometry(.16,.16,2.1,24),steel,-1.55,.54,0,[0,0,Math.PI/2]);
    add(new THREE.CylinderGeometry(.6,.64,.46,48),steel,-1.55,.74,.06,[Math.PI/2,0,0]);
    add(new THREE.CylinderGeometry(.54,.54,.07,48),silver,-1.55,.74,.33,[Math.PI/2,0,0]);
    const dial=document.createElement('canvas');dial.width=512;dial.height=512;let ctx=dial.getContext('2d');ctx.fillStyle='#f5fbf9';ctx.beginPath();ctx.arc(256,256,246,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#1a5b72';ctx.lineWidth=10;ctx.stroke();for(let i=0;i<36;i++){const a=i*Math.PI/18;let inner=i%3===0?188:205;ctx.beginPath();ctx.moveTo(256+Math.cos(a)*inner,256+Math.sin(a)*inner);ctx.lineTo(256+Math.cos(a)*225,256+Math.sin(a)*225);ctx.strokeStyle='#426f82';ctx.lineWidth=i%3===0?5:2;ctx.stroke()}ctx.fillStyle='#073a58';ctx.font='bold 52px Arial';ctx.textAlign='center';ctx.fillText('BAYLAN',256,147);ctx.font='bold 82px monospace';ctx.fillText('00124',256,292);ctx.font='28px Arial';ctx.fillText('m³  •  2010',256,350);const dialTex=new THREE.CanvasTexture(dial);dialTex.colorSpace=THREE.SRGBColorSpace;add(new THREE.PlaneGeometry(1.02,1.02),new THREE.MeshBasicMaterial({map:dialTex,transparent:true}),-1.55,.74,.377);
    add(new THREE.TorusGeometry(.54,.045,12,48),steel,-1.55,.74,.38);
    // ESP32-CAM: printed circuit board, chip, camera module and GPIO pin rows.
    const pcb=material('#116b66',.15,.42),gold=material('#e9b96e',.72,.25),black=material('#142f36',.15,.4);
    add(new THREE.BoxGeometry(1.22,.09,1.78),pcb,1.45,.18,0);
    add(new THREE.BoxGeometry(.64,.13,.64),black,1.45,.32,.25);
    add(new THREE.BoxGeometry(.52,.04,.52),steel,1.45,.42,.25);
    add(new THREE.CylinderGeometry(.22,.22,.16,32),black,1.45,.53,.25);
    add(new THREE.CylinderGeometry(.13,.13,.01,32),cyan,1.45,.62,.25);
    add(new THREE.BoxGeometry(.64,.11,.38),dark,1.45,.31,-.48);
    for(let i=0;i<8;i++){let z=-.72+i*.2;add(new THREE.BoxGeometry(.09,.075,.1),gold,.77,.19,z);add(new THREE.BoxGeometry(.09,.075,.1),gold,2.13,.19,z)}
    for(let i=0;i<5;i++)add(new THREE.BoxGeometry(.045,.014,.04),gold,1.15+i*.15,.235,-.05);
    const path=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-.5,.4,0),new THREE.Vector3(.4,.4,0)]),new THREE.LineBasicMaterial({color:'#27aeb7'}));scene.add(path);
    const resize=()=>{const w=mount.clientWidth,h=mount.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};const observer=new ResizeObserver(resize);observer.observe(mount);resize();
    let raf,onScreen=true;const visibility=new IntersectionObserver(entries=>{onScreen=entries[0]?.isIntersecting??true},{rootMargin:'100px'});visibility.observe(mount);const contextLost=e=>{e.preventDefault();setUnsupported(true)};renderer.domElement.addEventListener('webglcontextlost',contextLost);const animate=()=>{raf=requestAnimationFrame(animate);if(document.hidden||!onScreen)return;controls.update();renderer.render(scene,camera)};animate();
    return()=>{cancelAnimationFrame(raf);visibility.disconnect();observer.disconnect();controls.dispose();renderer.domElement.removeEventListener('webglcontextlost',contextLost);mount.removeChild(renderer.domElement);renderer.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose())});dialTex.dispose()};
  },[visible]);
  return <div className="device-scene"><div className="device-scene-canvas" ref={mountRef} aria-label={translate('Döndürülebilen üç boyutlu su sayacı ve ESP32-CAM modelleri',language)}/>{unsupported&&<div className="device-fallback" role="status">{translate('3D cihaz modeli bu cihazda açılamadı. Baylan 2010 su sayacı, ESP32-CAM ve OV2640 birlikte çalışır.',language)}</div>}<span className="device-label meter-label">BAYLAN 2010<br/><strong>{translate('Su sayacı',language)}</strong></span><span className="device-label esp-label">OV2640<br/><strong>ESP32-CAM</strong></span><span className="device-scene-hint"><RotateCcw size={12}/> {translate('Sürükleyerek incele',language)}</span></div>
}
function IconTile({module,active,onClick}){const Icon=module.Icon;return <button className={`icon-tile ${active?'active':''}`} style={{'--tile-color':module.color,'--tile-dark':module.dark}} onClick={onClick} aria-pressed={active}><span className="icon-cube"><Icon size={28} strokeWidth={2.2}/></span><span>{module.name==='Enerji'?'Temiz Enerji':module.name==='Su'?'Su Yönetimi':module.name==='Atık'?'Sıfır Atık':module.name==='Karbon'?'Karbon Azaltımı':'Akıllı Kampüs'}</span></button>}
function SectionHead({eyebrow,title,description,language}){return <div className="section-head"><div><span className="eyebrow">{translate(eyebrow,language)}</span><h2>{translate(title,language)}</h2></div>{description&&<p>{translate(description,language)}</p>}</div>}

function NetworkDiagram({language}){
  return <div className="network-graphic"><div className="mesh-board" aria-label={translate('Dört sensör router üzerinden gateway ve ana merkeze bağlanır',language)}>
    <svg viewBox="0 0 360 170" preserveAspectRatio="none" aria-hidden="true"><path d="M36 40 L155 85 M36 130 L155 85 M112 23 L155 85 M112 147 L155 85 M155 85 L245 85 L326 85" fill="none" stroke="#82cfc2" strokeWidth="2" strokeDasharray="5 5"/><path d="M155 85 L245 85 L326 85" fill="none" stroke="#20aabc" strokeWidth="2.5"/></svg>
    <span className="mesh-node mesh-sensor sensor-energy" data-label={translate('Enerji',language)} role="img" aria-label={translate('Enerji sensörü',language)}><Zap size={17}/></span><span className="mesh-node mesh-sensor sensor-water" data-label={translate('Su',language)} role="img" aria-label={translate('Su sensörü',language)}><Droplets size={17}/></span><span className="mesh-node mesh-sensor sensor-waste" data-label={translate('Atık',language)} role="img" aria-label={translate('Atık sensörü',language)}><Recycle size={17}/></span><span className="mesh-node mesh-sensor sensor-gas" data-label={translate('Doğalgaz',language)} role="img" aria-label={translate('Doğalgaz sensörü',language)}><Flame size={17}/></span>
    <span className="mesh-node mesh-router"><Wifi size={18}/><small>ROUTER</small></span><span className="mesh-node mesh-gateway"><Radio size={23}/><small>GATEWAY</small></span><span className="mesh-node mesh-main"><Server size={25}/><small>{translate('ANA MERKEZ',language)}</small></span>
  </div><div className="network-key"><span><i/> {translate('Sensörler',language)}</span><span><i/> Router</span><span><i/> Gateway</span><span><i/> {translate('Ana merkez',language)}</span></div></div>
}

function JourneyTrack({language}){
  const steps=[['1','Analiz','İhtiyaç analizi',Gauge],['2','Tasarım','Mimari & altyapı',Building2],['3','Geliştirme','Yazılım & AI',Cpu],['4','Pilot uygulama','Saha testi',Radio],['5','Değerlendirme','Raporlama',BarChart3]];
  return <div className="journey-track">{steps.map(([number,title,detail,Icon])=><div className="journey-step" key={number}><span className="journey-step-icon"><Icon size={19} strokeWidth={2}/></span><span className="journey-step-number">{number}</span><strong>{translate(title,language)}</strong><small>{translate(detail,language)}</small></div>)}</div>
}

function App(){
  const [language,setLanguage]=useState(()=>{
    const query=new URLSearchParams(window.location.search).get('lang');
    return query==='en'||query==='tr'?query:(localStorage.getItem('cop31-language')==='en'?'en':'tr');
  });
  const [active,setActive]=useState('enerji');
  const [period,setPeriod]=useState('Bu hafta');
  const [chartPoint,setChartPoint]=useState(null);
  const [compactChart,setCompactChart]=useState(()=>window.matchMedia('(max-width: 390px)').matches);
  const [reduced,setReduced]=useState(false);
  const sceneRef=useRef(null);
  const t=value=>translate(value,language);
  const formatValue=value=>new Intl.NumberFormat(language==='en'?'en-US':'tr-TR').format(value);
  const current=modules.find(m=>m.id===active);
  useEffect(()=>{document.documentElement.lang=language;document.title=language==='en'?'COP31 | Smart Campus':'COP31 | Akıllı Kampüs';const description=document.querySelector('meta[name="description"]');if(description)description.content=language==='en'?'COP31 Smart Campus: an interactive concept for AI-powered resource efficiency and zero-waste management.':'COP31 Akıllı Kampüs: yapay zekâ tabanlı kaynak verimliliği ve sıfır atık odaklı interaktif kampüs sunumu.';localStorage.setItem('cop31-language',language)},[language]);
  const chooseLanguage=next=>{setLanguage(next);const url=new URL(window.location.href);if(next==='en')url.searchParams.set('lang','en');else url.searchParams.delete('lang');window.history.replaceState(null,'',url)};
  useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(mq.matches);const fn=()=>setReduced(mq.matches);mq.addEventListener('change',fn);return()=>mq.removeEventListener('change',fn)},[]);
  useEffect(()=>{const mq=window.matchMedia('(max-width: 390px)');const fn=()=>setCompactChart(mq.matches);mq.addEventListener('change',fn);return()=>mq.removeEventListener('change',fn)},[]);
  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:reduced?'instant':'smooth'})};
  const chartConfig=active==='enerji'?{title:'Enerji tüketimi',range:period,unit:'kWh',values:referenceData.home.chart[period]}:
    active==='su'?{title:'Su tüketimi',range:'Bu hafta',unit:'m³',values:referenceData.water.daily}:
    active==='dogalgaz'?{title:'Doğalgaz tüketimi',range:'Son 7 gün',unit:'m³',values:referenceData.gas.daily}:
    active==='atik'?{title:'Atık dağılımı',range:'Günlük ortalama',unit:'kg',values:referenceData.waste.categories.map(item=>({label:item.name,value:item.value}))}:
    {title:'Karbon kaynakları',range:'Kaynak dağılımı',unit:'kg CO₂e',values:referenceData.carbon.sources.map(item=>({label:item.name,value:item.value}))};
  const chartValues=active==='enerji'&&period==='Bugün'?chartConfig.values.filter((_,index)=>index%(compactChart?3:2)===0):chartConfig.values;
  const chartMax=Math.max(...chartConfig.values.map(item=>item.value),1);
  useEffect(()=>setChartPoint(null),[active,period]);
  const selectedChartPoint=chartPoint===null?null:chartValues[chartPoint];
  const handleModuleMove=e=>{if(e.pointerType==='touch')return;const logo=e.currentTarget;const rect=logo.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5;const y=(e.clientY-rect.top)/rect.height-.5;logo.style.setProperty('--move-x',`${x*10}px`);logo.style.setProperty('--move-y',`${y*10}px`);logo.style.setProperty('--rotate-x',`${-y*24}deg`);logo.style.setProperty('--rotate-y',`${x*28}deg`)};
  const resetModuleHover=e=>{const logo=e.currentTarget;['--move-x','--move-y','--rotate-x','--rotate-y'].forEach(prop=>logo.style.removeProperty(prop))};
  return <div className="site-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="site-header" id="baslangic">
      <div className="header-toolbar"><div className="language-switch" role="group" aria-label={language==='en'?'Select language':'Dil seçimi'}><button type="button" lang="tr" className={language==='tr'?'active':''} aria-pressed={language==='tr'} aria-label={language==='en'?'Switch to Turkish':'Türkçe'} onClick={()=>chooseLanguage('tr')}><span aria-hidden="true">🇹🇷</span> TR</button><button type="button" lang="en" className={language==='en'?'active':''} aria-pressed={language==='en'} aria-label={language==='en'?'English':'İngilizceye geç'} onClick={()=>chooseLanguage('en')}><span aria-hidden="true">🇬🇧</span> EN</button></div></div>
      <div className="header-main"><BrandMark language={language}/><div className="header-copy"><div className="overline"><span className="pulse-dot"/> {t("COP31 • SÜRDÜRÜLEBİLİRLİK PLATFORMU")}</div><h1 className="project-title">{t("Yapay Zekâ Tabanlı Kaynak Verimliliği ve Sıfır Atık Odaklı Akıllı Kampüs Yönetim Sistemi")}<span>{t("Kaynakları akıllıca, geleceği birlikte yönetiyoruz.")}</span></h1></div><div className="cop-lockup"><span className="globe-mark"><Globe2 size={48}/><Leaf size={21}/></span><div><strong>COP31</strong><small>{t("İklim Eylemi için")}<br/>{t("Akıllı Çözümler")}</small></div></div></div>
    </header>
    <main>
      <section className="hero-section" id="kampus"><div className="hero-heading"><div><span className="eyebrow"><span className="eyebrow-line"/> {t("DİJİTAL KAMPÜS DENEYİMİ")}</span><h2>{t("Yeşil kampüs.")}<br/><em>{t("Akıllı gelecek.")}</em></h2><p>{t("Sensörlerden gelen veriler yapay zekâ destekli karar desteğine dönüşür. Kaynakları koruyan kampüs modelini keşfedin.")}</p></div><button className="explore-link" onClick={()=>scrollTo('sistem')}>{t("Sistemi keşfet")} <ArrowDown size={17}/></button></div>
        <div className="hero-grid"><aside className="sensor-card glass"><div className="panel-topline"><span>{t("01 / SAHA KATMANI")}</span><Radio size={17}/></div><h3>{t("Kampüs kaynakları")}<br/>{t("ve sensörler")}</h3><p className="panel-sub">{t("IoT cihazları ve ölçüm sistemleri")}</p><div className="sensor-list">{modules.map(m=>{const Icon=m.Icon;return <button key={m.id} className={`sensor-row ${active===m.id?'selected':''}`} onClick={()=>setActive(m.id)} style={{'--row-color':m.color,'--row-dark':m.dark}}><span className="sensor-icon"><Icon size={22}/></span><span className="sensor-text"><strong>{t(m.name)}</strong><small>{t(m.id==='enerji'?'Akıllı sayaçlar · prizler':m.id==='su'?'Mekanik sayaç · OCR':m.id==='dogalgaz'?'Gaz sensörleri · sayaçlar':m.id==='atik'?'Akıllı kutular · doluluk':'Emisyon faktörleri')}</small></span><ArrowRight size={15}/></button>})}</div><div className="card-footnote"><span className="signal"><Wifi size={14}/></span> {t("Zigbee · Wi-Fi · LoRa ile tek merkez")}</div></aside>
          <div className="campus-stage"><div className="stage-top"><span><span className="scene-indicator"/> {t("ETKİLEŞİMLİ 3D KAMPÜS")}</span><span className="drag-hint"><RotateCcw size={14}/> {t("Sürükle & döndür")}</span></div><CampusScene active={active} onSelect={setActive} language={language}/><div className="scene-vignette"/><div className="scene-title"><span>{t("YOZGAT BOĞAZLIYAN MYO")}</span><strong>{t("Yaşayan kampüs modeli")}</strong><p>{t("MYO’dan ilham alan kavramsal 3D görünüm · Binayı seçerek inceleyin.")}</p></div><div className="scene-badge"><Sparkles size={15}/> {t("3D DENEYİM")}</div><div className="scene-bottom"><span>01 <i/> {t("SAHA")}</span><span>02 <i/> {t("İLETİŞİM")}</span><span>03 <i/> {t("ANALİZ")}</span><span>04 <i/> {t("ETKİ")}</span></div></div>
          <aside className="dashboard-card glass"><div className="dashboard-heading"><div><span className="panel-topline">{t("03 / GÖRÜNÜRLÜK KATMANI")}</span><h3>{t("Akıllı yönetim paneli")}</h3><p>{t("Kaynak verimliliği, tek bakışta.")}</p></div><span className="dashboard-live"><span/> DEMO</span></div><div className="metric-main" style={{'--metric-color':current.color,'--metric-dark':current.dark}}><div className="metric-icon"><current.Icon size={28}/></div><div><span>{t(current.name).toLocaleUpperCase(language==='en'?'en-US':'tr-TR')} / {t("KAYNAK PANELİ")}</span><strong>{localizeMetric(current.metric,language)}</strong><small>{t(current.label)}</small></div></div><div className="chart-header"><span>{t(chartConfig.title)} <small>{t(chartConfig.range)}</small></span>{active==='enerji'&&<div className="period-switch" aria-label={t("Grafik dönemi")}>{['Bugün','Bu hafta','Bu ay'].map(p=><button className={period===p?'on':''} key={p} onClick={()=>setPeriod(p)}>{t(p)}</button>)}</div>}</div><div className="bar-chart" aria-label={`${t(chartConfig.title)}, ${t(chartConfig.range)}, ${t("kaynak gösterim verisi")}`}>{chartValues.map((item,i)=><button type="button" className={`chart-col ${chartPoint===i?'active':''}`} key={`${item.label}-${i}`} aria-label={`${t(item.label)}: ${formatValue(item.value)} ${chartConfig.unit}`} aria-pressed={chartPoint===i} onPointerEnter={e=>{if(e.pointerType!=='touch')setChartPoint(i)}} onPointerLeave={e=>{if(e.pointerType!=='touch')setChartPoint(null)}} onFocus={()=>setChartPoint(i)} onClick={()=>setChartPoint(i)}><span style={{height:`${Math.max(8,Math.max(0,item.value)/chartMax*92)}%`,'--bar-color':current.color}}/><small>{active==='enerji'&&period==='Bugün'?item.label.slice(0,2):t(item.label)}</small></button>)}{selectedChartPoint&&<div className="chart-tooltip" role="status"><strong>{t(selectedChartPoint.label)}</strong><span>{formatValue(selectedChartPoint.value)} {chartConfig.unit}</span></div>}</div><AiRecommendation resource={active} language={language}/><button className="dashboard-link" onClick={()=>scrollTo('sistem')}>{t("Sistem akışını incele")} <ArrowRight size={16}/></button></aside></div>
        <div className="hero-summary"><div><span className="summary-icon"><Activity size={21}/></span><strong>{t("Gerçek zamanlı izleme")}</strong><small>{t("Sensörden anlamlı içgörüye")}</small></div><div><span className="summary-icon"><BrainCircuit size={21}/></span><strong>{t("Yapay zekâ desteği")}</strong><small>{t("Anomali · tahmin · öneri")}</small></div><div><span className="summary-icon"><Leaf size={21}/></span><strong>{t("Sürdürülebilir etki")}</strong><small>{t("Daha verimli, daha yeşil")}</small></div></div>
      </section>
      <section className="system-section section-wrap" id="sistem"><SectionHead language={language} eyebrow="SİSTEMİN KALBİ" title="Verinin kampüs içindeki yolculuğu" description="Sunumdaki katmanlı mimari, kaynak verisinin ölçümden karara nasıl ulaştığını gösterir."/><div className="flow-row"><div className="flow-step"><span className="flow-number">01</span><span className="flow-icon"><Radio/></span><strong>{t("Saha sensörleri")}</strong><p>{t("Enerji, su, doğalgaz, atık ve karbon verileri.")}</p></div><ArrowRight className="flow-arrow"/><div className="flow-step"><span className="flow-number">02</span><span className="flow-icon"><Wifi/></span><strong>{t("IoT iletişimi")}</strong><p>{t("Zigbee Mesh, Wi-Fi ve LoRa bağlantısı.")}</p></div><ArrowRight className="flow-arrow"/><div className="flow-step"><span className="flow-number">03</span><span className="flow-icon"><Cloud/></span><strong>MQTT / API</strong><p>{t("Güvenli aktarım ve veri entegrasyonu.")}</p></div><ArrowRight className="flow-arrow"/><div className="flow-step"><span className="flow-number">04</span><span className="flow-icon"><Database/></span><strong>{t("Veri merkezi")}</strong><p>{t("Zaman serisi, doğrulama ve kayıt.")}</p></div><ArrowRight className="flow-arrow"/><div className="flow-step"><span className="flow-number">05</span><span className="flow-icon"><BrainCircuit/></span><strong>{t("AI & karar")}</strong><p>{t("Tahmin, optimizasyon ve raporlama.")}</p></div></div><div className="architecture-band"><div><Server size={22}/><span>{t("Ortak veri modeli")}</span></div><b>+</b><div><BrainCircuit size={22}/><span>{t("Yapay zekâ")}</span></div><b>+</b><div><Gauge size={22}/><span>{t("Karar desteği")}</span></div><b>+</b><div><Leaf size={22}/><span>{t("Sürdürülebilirlik")}</span></div></div></section>
      <section className="modules-section section-wrap"><SectionHead language={language} eyebrow="MODÜLER YAPI" title="Beş kaynak. Tek akıllı platform." description="Modüllerden birini seçerek kampüs modeli ve örnek gösterge panelini birlikte inceleyin."/><div className="module-grid">{modules.map(m=>{const Icon=m.Icon;return <button key={m.id} className={`module-card ${active===m.id?'selected':''}`} onClick={()=>{setActive(m.id);scrollTo('kampus')}} style={{'--module-color':m.color,'--module-dark':m.dark}}><span className="module-top"><span className="module-illustration" onPointerMove={handleModuleMove} onPointerLeave={resetModuleHover}><span className="module-icon-face"><Icon size={31}/></span></span><ArrowRight size={16}/></span><strong>{t(m.short)}</strong><span className="module-bullets">{m.bullets.map(b=><span key={b}><Check size={14}/>{t(b)}</span>)}</span><span className="module-action">{t("Kampüste görüntüle")} <ArrowRight size={14}/></span></button>})}</div></section>
      <section className="tech-section section-wrap" id="teknoloji"><SectionHead language={language} eyebrow="TEKNOLOJİ KATMANI" title="Sahadan karar ekranına" description="Sunumdaki teknik bileşenlerin etkileşimli ve okunabilir özeti."/><div className="tech-grid"><article className="tech-card ocr-card"><span className="card-kicker">{t("01 / AKILLI OKUMA")}</span><h3>{t("Su sayacı uzaktan izleme ve OCR")}</h3><p>{t("Mevcut Baylan 2010 mekanik sayaç, ESP32-CAM ve OV2640 ile dijital olarak okunur.")}</p><DeviceScene language={language}/><div className="tech-proof"><ShieldCheck size={18}/> {t("7 günlük doğrulama · veri karşılaştırma · hata analizi")}</div></article><article className="tech-card network-card"><span className="card-kicker">{t("02 / BAĞLANTI")}</span><h3>{t("Zigbee Mesh ağ topolojisi")}</h3><p>{t("Sensörler, router ve gateway üzerinden bulut veri merkezine bağlanır.")}</p><NetworkDiagram language={language}/></article><article className="tech-card ai-card"><span className="card-kicker">{t("03 / YAPAY ZEKÂ")}</span><h3>{t("Ölçüm verilerinden akıllı karar desteği")}</h3><p>{t("Kaynak ölçümlerini analiz ederek olağandışı tüketimi gösterir, gelecek ihtiyacını öngörür ve tasarruf önerileri üretir.")}</p><div className="ai-features"><span><BarChart3/> {t("Tüketim eğilimlerini izle")}</span><span><Activity/> {t("Olağandışı tüketimi belirle")}</span><span><BrainCircuit/> {t("Gelecek tüketimi öngör")}</span><span><Sparkles/> {t("Tasarruf önerisi üret")}</span></div><div className="ai-footer">{t("Ölçüm → Analiz → Öneri → Doğrulama")} <ArrowRight size={17}/></div></article></div></section>
      <ReadingDemo language={language}/>
      <section className="goals-section section-wrap" id="hedefler"><SectionHead language={language} eyebrow="HEDEFLER VE ETKİ" title="Ölçülebilir bir sürdürülebilirlik yolculuğu" description="Aşağıdaki değerler sunumdaki pilot hedefleridir; gerçekleşmiş performans verisi değildir."/><div className="goals-grid"><div className="goal-card"><span><Zap size={24}/></span><strong>{t("%10–15")}</strong><p>{t("Enerji verimliliği potansiyeli")}</p></div><div className="goal-card"><span><Droplets size={24}/></span><strong>{t("%10")}</strong><p>{t("Su tasarrufu potansiyeli")}</p></div><div className="goal-card"><span><Recycle size={24}/></span><strong>{t("%15")}</strong><p>{t("Atık ayrıştırma artışı")}</p></div><div className="goal-card"><span><Leaf size={24}/></span><strong>{t("Düşük")}</strong><p>{t("Karbon ayak izi hedefi")}</p></div><div className="goal-card"><span><Wifi size={24}/></span><strong>{t(">%90")}</strong><p>{t("Sistem erişilebilirliği hedefi")}</p></div></div><div className="journey"><div><span className="eyebrow">{t("5 AŞAMALI METODOLOJİ")}</span><h3>{t("Fikirden yaşayan kampüse")}</h3></div><JourneyTrack language={language}/></div></section>
      
      <NationalConnections language={language}/>
      <section className="closing-section"><div className="closing-leaf"><Leaf size={35}/></div><span className="eyebrow">{t("COP31 AKILLI KAMPÜS")}</span><h2>{t("Daha yeşil kampüs.")}<br/><em>{t("Daha sürdürülebilir gelecek.")}</em></h2><p>{t("Teknolojiyle izlenen her kaynak, geleceğe yapılan yatırımdır.")}</p><blockquote className="closing-quote">“{t("İklim değişikliği hızlanırken sorumluluğumuz daha da netleşiyor. Yapay zekanın gücüyle, internet olmasa da tek panelden ölçüyor, kaynakları akıllıca yönetiyor, sıfır atıkla çevreyi koruyor ve COP31 in sürdürülebilir gelecek vizyonuna katkı sunuyoruz. Çünkü daha temiz bir çevre, yaşanabilir bir iklim ve yeşil bir gelecek teknoloji ile değil, teknolojiyi doğa için kullanmakla mümkün.")}” <span aria-hidden="true">🍀♻️</span></blockquote><div className="project-links"><a href="https://ruwqersia.is-a.dev/akilli-kampus/" target="_blank" rel="noopener noreferrer">{t("Proje Okulumuz için")} <ArrowRight size={17}/></a><a href="https://ruwqersia.is-a.dev/yobu-akilli-kampus/" target="_blank" rel="noopener noreferrer">{t("Proje Kampüsümüz için")} <ArrowRight size={17}/></a></div><a className="team-page-link" href={language==="en"?"/ekip/?lang=en":"/ekip/"}>{t("Proje yürütücülerini tanı")} <ArrowRight size={17}/></a><button onClick={()=>scrollTo('baslangic')}>{t("Kampüse geri dön")} <ArrowRight size={18}/></button></section>
    </main><footer><div><strong>COP31 <span>{t("Akıllı Kampüs")}</span></strong><p>{t("Yozgat Bozok Üniversitesi · Boğazlıyan MYO")}</p></div><p>{t("Sunum içeriği etkileşimli web deneyimine uyarlanmıştır. Panodaki veriler gösterim amaçlıdır.")}</p><span>{t("© 2026 COP31")}</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(window.location.pathname.replace(/\/$/,'')==='/ekip'?<TeamPage/>:<App/>);





