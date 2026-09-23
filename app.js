/* SKYLINE ATLAS — all bearings are clockwise from true north. */
const ORIGIN = { lat: 35.710085, lon: 139.810715 };
const PHOTO = [
  { id:'clear-2016', name:'南西 · 東京タワーと隅田川', short:'南西', degree:250, year:2016, author:'louisredon', license:'CC0', file:'Cityscape_of_Tokyo,_view_from_Tokyo_Skytree_(2016-01-04_by_louisredon_@Pixabay_1141165).jpg', alt:'スカイツリーから東京タワーと隅田川方面を望む2016年の実写' },
  { id:'clear-2014', name:'南西 · 両国と都心', short:'南西', degree:240, year:2014, author:'Takeishiwataru', license:'CC0', file:'Cityscape_of_Tokyo,_view_from_Tokyo_Skytree_(2014-11-10_by_Takeishiwataru_@Pixabay_1272392).jpg', alt:'スカイツリーから両国と都心方面を望む2014年の実写' }
];
// Landmark positions are representative points. They are maintained separately
// from the photographs and do not assert that a feature is visible in a photo.
const SPOTS = [
  {id:'sensoji',name:'浅草寺',lat:35.714765,lon:139.796655,area:'浅草・台東区',detail:'雷門の北側に位置する浅草の寺院。'},
  {id:'kinshicho',name:'錦糸町駅',lat:35.6967,lon:139.8145,area:'錦糸町・墨田区',detail:'スカイツリーの南側に広がる街。'},
  {id:'ueno',name:'上野公園',lat:35.7148,lon:139.7731,area:'上野・台東区',detail:'博物館や緑地が集まるエリア。'},
  {id:'akihabara',name:'秋葉原駅',lat:35.69836,lon:139.77313,area:'秋葉原・千代田区',detail:'総武線と山手線が交わる地点。'},
  {id:'tokyo',name:'東京駅',lat:35.681236,lon:139.767125,area:'丸の内・千代田区',detail:'都心の鉄道拠点。駅の中心付近を指しています。'},
  {id:'palace',name:'皇居',lat:35.685175,lon:139.7528,area:'千代田区',detail:'広い皇居敷地の中央付近を代表点としています。'},
  {id:'dome',name:'東京ドーム',lat:35.70564,lon:139.7519,area:'文京区',detail:'後楽園のドーム球場。'},
  {id:'tower',name:'東京タワー',lat:35.65858,lon:139.74543,area:'芝公園・港区',detail:'都心の南西側に位置する電波塔。'},
  {id:'shinjuku',name:'新宿駅',lat:35.6896,lon:139.7006,area:'新宿区',detail:'副都心の中心的な駅。'},
  {id:'shibuya',name:'渋谷駅',lat:35.65803,lon:139.70164,area:'渋谷区',detail:'山手線西側の大きなターミナル。'},
  {id:'ikebukuro',name:'池袋駅',lat:35.7295,lon:139.7109,area:'豊島区',detail:'スカイツリーから見て西北西側。'},
  {id:'odaiba',name:'お台場海浜公園',lat:35.6289,lon:139.7755,area:'東京湾岸・港区',detail:'東京湾の埋立地に広がる海浜エリア。'},
  {id:'bigsight',name:'東京ビッグサイト',lat:35.6298,lon:139.7942,area:'有明・江東区',detail:'東京湾岸の展示施設。'},
  {id:'kasai',name:'葛西臨海公園',lat:35.6437,lon:139.8614,area:'江戸川区',detail:'東京湾に面した大型公園。'},
  {id:'disney',name:'東京ディズニーランド',lat:35.6329,lon:139.8804,area:'浦安・千葉県',detail:'東京湾の東岸に位置するテーマパーク。'},
  {id:'haneda',name:'羽田空港',lat:35.5494,lon:139.7798,area:'大田区',detail:'滑走路が広い範囲に及ぶため、空港中央付近を代表点としています。'},
  {id:'saitama',name:'さいたま新都心駅',lat:35.8931,lon:139.6337,area:'さいたま市',detail:'埼玉県の南部に位置する業務地区。'},
  {id:'makuhari',name:'幕張メッセ',lat:35.6461,lon:140.0346,area:'千葉市',detail:'東京湾の北東岸にある展示施設。'},
  {id:'yokohama',name:'横浜ランドマークタワー',lat:35.4548,lon:139.6317,area:'みなとみらい・横浜市',detail:'東京湾の南西側にある高層建築。'},
  {id:'tsukuba',name:'筑波山',lat:36.2253,lon:140.1066,area:'茨城県',detail:'遠く北北東に位置する山。視認は天候と遮蔽物に左右されます。'},
  {id:'takao',name:'高尾山',lat:35.6251,lon:139.2437,area:'八王子市',detail:'東京西部の山。視認は天候と遮蔽物に左右されます。'},
  {id:'fuji',name:'富士山',lat:35.3606,lon:138.7274,area:'静岡・山梨県境',detail:'晴れた日に西南西へ望めることがある山。いつでも見えるとは限りません。'}
];
const radians = x => x * Math.PI / 180;
const degrees = x => x * 180 / Math.PI;
const norm = x => (Math.round(x) % 360 + 360) % 360;
const angleDiff = (a,b) => Math.abs(((a-b+540)%360)-180);
function geography(point){
  const a=radians(ORIGIN.lat),b=radians(point.lat),dl=radians(point.lon-ORIGIN.lon),dlat=b-a;
  const hav=Math.sin(dlat/2)**2+Math.cos(a)*Math.cos(b)*Math.sin(dl/2)**2;
  const km=6371.0088*2*Math.asin(Math.min(1,Math.sqrt(hav)));
  const bearing=norm(degrees(Math.atan2(Math.sin(dl)*Math.cos(b),Math.cos(a)*Math.sin(b)-Math.sin(a)*Math.cos(b)*Math.cos(dl))));
  return {km,bearing};
}
for(const spot of SPOTS) Object.assign(spot,geography(spot));
const el=id=>document.getElementById(id);
const $={viewer:el('viewer'),photoLayer:el('photoLayer'),viewPhoto:el('viewPhoto'),photoMode:el('photoMode'),mapMode:el('mapMode'),compass:el('compass'),bearing:el('bearing'),spotList:el('spotList'),selectedSpot:el('selectedSpot')};
const directions=['北','北北東','北東','東北東','東','東南東','南東','南南東','南','南南西','南西','西南西','西','西北西','北西','北北西'];
const english=['NORTH','NORTH · NORTHEAST','NORTHEAST','EAST · NORTHEAST','EAST','EAST · SOUTHEAST','SOUTHEAST','SOUTH · SOUTHEAST','SOUTH','SOUTH · SOUTHWEST','SOUTHWEST','WEST · SOUTHWEST','WEST','WEST · NORTHWEST','NORTHWEST','NORTH · NORTHWEST'];
const initial=new URLSearchParams(location.search);
let heading=Number.isFinite(Number(initial.get('bearing')))&&initial.has('bearing')?norm(Number(initial.get('bearing'))):250;
let mode=initial.get('mode')==='map'?'map':'photo';
let selected=SPOTS.find(s=>s.id===initial.get('spot'))||SPOTS.find(s=>s.id==='tower');
let currentPhotoId='';let map=null;let mapReady=false;let mapFailed=false;let gesture=null;let toastTimer;
const photoPath=p=>'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(p.file)+'?width=1920';
const photoSource=p=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file);
const fmtDistance=km=>km<10?km.toFixed(1):Math.round(km).toString();
function nearestPhoto(){const list=PHOTO.map(p=>({p,d:angleDiff(heading,p.degree)})).sort((a,b)=>a.d-b.d);return list[0].d<=23?list[0].p:null}
function compassMarkup(){
  const rings=[48,84,114].map(r=>`<circle cx="130" cy="130" r="${r}" fill="none" stroke="rgba(213,236,224,.15)" stroke-width="1"/>`).join('');
  const major=[['N',0],['E',90],['S',180],['W',270]].map(([t,a])=>{let x=130+Math.sin(radians(a))*110,y=130-Math.cos(radians(a))*110;return `<text x="${x}" y="${y+3}" text-anchor="middle" fill="${a===0?'#c9e895':'#9cb4ae'}" font-size="11" font-family="sans-serif" font-weight="bold">${t}</text>`}).join('');
  const dots=SPOTS.map(s=>{let r=38+Math.min(64,Math.log1p(s.km)*16),x=130+Math.sin(radians(s.bearing))*r,y=130-Math.cos(radians(s.bearing))*r;return `<circle data-spot="${s.id}" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${s===selected?4:2.2}" fill="${s===selected?'#e8cba1':'#789c93'}"><title>${s.name} ${Math.round(s.bearing)}° / ${fmtDistance(s.km)} km</title></circle>`}).join('');
  const x=130+Math.sin(radians(heading))*103,y=130-Math.cos(radians(heading))*103;
  return `<circle cx="130" cy="130" r="124" fill="rgba(5,19,24,.25)" stroke="rgba(213,236,224,.35)" stroke-width="1"/>${rings}<line x1="130" y1="130" x2="${x}" y2="${y}" stroke="#c9e895" stroke-width="2"/><circle cx="${x}" cy="${y}" r="5" fill="#c9e895"/>${dots}<circle cx="130" cy="130" r="24" fill="#11252b" stroke="rgba(213,236,224,.25)"/>${major}`;
}
function renderPhoto(){
  const p=mode==='photo'?nearestPhoto():null;
  $.photoLayer.classList.toggle('is-hidden',!p);
  $.viewer.classList.toggle('map-visible',!p);
  if(p){
    if(currentPhotoId!==p.id){$.viewPhoto.src=photoPath(p);$.viewPhoto.alt=p.alt;currentPhotoId=p.id}
    el('mediaKind').textContent='実写資料 · '+p.short;
    el('photoLabel').textContent=`PHOTO / ${p.year} · ${p.author} · ${p.license}`;
    el('photoNotice').textContent='実際の景色。写真の画角は方位計に連動しません。';
  }else{
    el('mediaKind').textContent=mode==='map'?'実際の地理 · 地図表示':'実際の地理 · この方角の写真は未収録';
    el('photoLabel').textContent='MAP / OPENSTREETMAP';
    el('photoNotice').textContent='建物の高さ・遠方の地形・眺望を完全再現した図ではありません。';
  }
}
function renderTicks(){
  el('bearingTicks').innerHTML=Array.from({length:13},(_,i)=>{
    const offset=(i-6)*15,deg=norm(heading+offset),main=deg%90<7||deg%90>83;
    return `<span class="tick ${main?'major':''}" style="left:${50+offset/2.0}%">${String(deg).padStart(3,'0')}°</span>`;
  }).join('');
}
function renderSelected(){
  $.selectedSpot.innerHTML=`<div class="selected-spot-top"><span>SELECTED LANDMARK</span><span class="selected-spot-icon" aria-hidden="true">↗</span></div><div><h3>${selected.name}</h3><p>${selected.area} · ${selected.detail}</p><div class="spot-stats"><div><strong>${fmtDistance(selected.km)}<small> km</small></strong><small>直線距離 / 概算</small></div><div><strong>${Math.round(selected.bearing)}<small> °</small></strong><small>真北からの方位</small></div></div><button id="lookAtSpot" type="button">この方角を見る ↗</button></div>`;
  el('lookAtSpot').addEventListener('click',()=>{setBearing(selected.bearing);setMode('map');$.viewer.scrollIntoView({behavior:'smooth',block:'center'})});
  $.spotList.querySelectorAll('.spot').forEach(n=>n.classList.toggle('active',n.dataset.id===selected.id));
  if(mapReady)updateSightLine();
}
function renderSpotList(){
  const q=el('spotSearch').value.trim().toLowerCase();
  const items=SPOTS.filter(s=>(s.name+' '+s.area+' '+s.id).toLowerCase().includes(q));
  $.spotList.innerHTML=items.length?items.map((s,i)=>`<button class="spot ${s===selected?'active':''}" data-id="${s.id}" type="button"><span class="spot-index">${String(i+1).padStart(2,'0')}</span><span class="spot-name">${s.name}</span><span class="spot-distance">${fmtDistance(s.km)} km</span><span class="spot-arrow">↗</span></button>`).join(''):'<div class="spot-empty">該当するスポットはありません。</div>';
  $.spotList.querySelectorAll('.spot').forEach(btn=>btn.addEventListener('click',()=>{selected=SPOTS.find(s=>s.id===btn.dataset.id);renderSelected();setBearing(selected.bearing)}));
}
function updateURL(){const q=new URLSearchParams();q.set('bearing',String(heading));q.set('spot',selected.id);q.set('mode',mode);history.replaceState(null,'',location.pathname+'?'+q+location.hash)}
function setBearing(value){
  heading=norm(Number(value));const index=Math.round(heading/22.5)%16;
  el('degreeLarge').innerHTML=`${heading}<span>°</span>`;el('degreeSmall').textContent=heading+'°';el('directionRoman').textContent=english[index];el('directionJapanese').textContent=directions[index]+'の方角';$.bearing.value=heading;
  document.querySelectorAll('[data-bearing]').forEach(b=>b.classList.toggle('active',Number(b.dataset.bearing)===heading));
  $.compass.innerHTML=compassMarkup();renderTicks();renderPhoto();
  if(mapReady)map.rotateTo(heading,{duration:300});updateURL();
}
function setMode(value){mode=value;$.photoMode.classList.toggle('active',mode==='photo');$.mapMode.classList.toggle('active',mode==='map');$.photoMode.setAttribute('aria-pressed',String(mode==='photo'));$.mapMode.setAttribute('aria-pressed',String(mode==='map'));renderPhoto();if(mapReady)map.resize();updateURL()}
function updateSightLine(){const source=map?.getSource('sight-line');if(source)source.setData({type:'Feature',geometry:{type:'LineString',coordinates:[[ORIGIN.lon,ORIGIN.lat],[selected.lon,selected.lat]]}})}
function initMap(){
  if(!window.maplibregl){mapFailed=true;el('mapFailure').hidden=false;return}
  try{
    map=new maplibregl.Map({container:'map',style:'https://tiles.openfreemap.org/styles/liberty',center:[ORIGIN.lon,ORIGIN.lat],zoom:12.6,pitch:52,bearing:heading,maxPitch:65,attributionControl:true,canvasContextAttributes:{antialias:true}});
    map.addControl(new maplibregl.NavigationControl({showCompass:false}),'bottom-right');map.dragPan.disable();map.dragRotate.disable();map.touchZoomRotate.disableRotation();
    map.on('load',()=>{
      mapReady=true;el('mapFailure').hidden=true;
      map.addSource('landmarks',{type:'geojson',data:{type:'FeatureCollection',features:SPOTS.map(s=>({type:'Feature',properties:{id:s.id,name:s.name},geometry:{type:'Point',coordinates:[s.lon,s.lat]}}))}});
      map.addLayer({id:'landmark-halo',type:'circle',source:'landmarks',paint:{'circle-radius':7,'circle-color':'#a8d4bd','circle-opacity':.22}});
      map.addLayer({id:'landmark-points',type:'circle',source:'landmarks',paint:{'circle-radius':3.6,'circle-color':'#c9e895','circle-stroke-color':'#14302f','circle-stroke-width':1.2}});
      map.addSource('sight-line',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:[[ORIGIN.lon,ORIGIN.lat],[selected.lon,selected.lat]]}}});
      map.addLayer({id:'sight-line',type:'line',source:'sight-line',paint:{'line-color':'#d6ef9f','line-width':2,'line-dasharray':[2,2]}});
      const sourceName=map.getStyle().sources.openmaptiles?'openmaptiles':null;
      if(sourceName){
        const firstSymbol=map.getStyle().layers.find(l=>l.type==='symbol')?.id;
        map.addLayer({id:'buildings-3d',type:'fill-extrusion',source:sourceName,'source-layer':'building',minzoom:15,paint:{'fill-extrusion-color':'#b9cbbb','fill-extrusion-height':['coalesce',['get','render_height'],0],'fill-extrusion-base':['coalesce',['get','render_min_height'],0],'fill-extrusion-opacity':.65}},firstSymbol);
      }
      const pin=document.createElement('div');pin.className='origin-pin';pin.title='東京スカイツリー';pin.style.cssText='width:15px;height:15px;border:3px solid #c9e895;background:#16342c;border-radius:50%;box-shadow:0 0 0 5px #c9e89555';new maplibregl.Marker({element:pin}).setLngLat([ORIGIN.lon,ORIGIN.lat]).addTo(map);
      map.on('click','landmark-points',e=>{const id=e.features?.[0]?.properties?.id;const found=SPOTS.find(s=>s.id===id);if(found){selected=found;renderSelected();setBearing(found.bearing)}});
      map.on('mouseenter','landmark-points',()=>map.getCanvas().style.cursor='pointer');map.on('mouseleave','landmark-points',()=>map.getCanvas().style.cursor='');
    });
    map.on('error',e=>{if(!mapReady&&!mapFailed){mapFailed=true;el('mapFailure').hidden=false;console.warn('MapLibre map load failed',e.error)}});
  }catch(e){mapFailed=true;el('mapFailure').hidden=false;console.warn('Map unavailable',e)}
}
function init(){
  el('spotCount').textContent=SPOTS.length;setBearing(heading);setMode(mode);renderSpotList();renderSelected();
  el('photoCards').innerHTML=PHOTO.map((p,i)=>`<button class="photo-card" type="button" data-photo="${p.id}" aria-label="${p.name}の写真資料を見る"><img src="${photoPath(p)}" alt="${p.alt}" loading="lazy"><div class="photo-card-body"><span class="photo-card-num">VIEW ${String(i+1).padStart(2,'0')}</span><span class="photo-card-year">${p.year}</span><div class="photo-card-title">${p.name}</div></div></button>`).join('');
  el('photoCards').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const p=PHOTO.find(x=>x.id===b.dataset.photo);setBearing(p.degree);setMode('photo');$.viewer.scrollIntoView({behavior:'smooth',block:'center'})}));
  $.photoMode.addEventListener('click',()=>setMode('photo'));$.mapMode.addEventListener('click',()=>setMode('map'));
  $.bearing.addEventListener('input',e=>setBearing(e.target.value));el('spotSearch').addEventListener('input',renderSpotList);
  document.querySelectorAll('[data-bearing]').forEach(b=>b.addEventListener('click',()=>setBearing(b.dataset.bearing)));
  el('rotateLeft').addEventListener('click',()=>setBearing(heading-15));el('rotateRight').addEventListener('click',()=>setBearing(heading+15));
  $.compass.addEventListener('click',e=>{if(e.target.dataset.spot){selected=SPOTS.find(s=>s.id===e.target.dataset.spot);renderSelected();setBearing(selected.bearing);return}const box=$.compass.getBoundingClientRect();const dx=e.clientX-(box.left+box.width/2),dy=e.clientY-(box.top+box.height/2);if(Math.hypot(dx,dy)>20)setBearing(degrees(Math.atan2(dx,-dy)))});
  $.viewer.addEventListener('pointerdown',e=>{if(e.target.closest('button,.maplibregl-control-container'))return;gesture={x:e.clientX,heading};$.viewer.setPointerCapture(e.pointerId)});
  $.viewer.addEventListener('pointermove',e=>{if(gesture)setBearing(gesture.heading+(gesture.x-e.clientX)*.42)});
  $.viewer.addEventListener('pointerup',()=>gesture=null);$.viewer.addEventListener('pointercancel',()=>gesture=null);
  $.viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();setBearing(heading+(e.key==='ArrowRight'?5:-5))}});
  el('fullscreen').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else $.viewer.requestFullscreen?.()});
  $.viewPhoto.addEventListener('error',()=>{el('photoNotice').textContent='この写真を表示できません。写真資料一覧から出典をご確認ください。'});
  initMap();
}
init();
