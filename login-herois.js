/* PyQuest: personagens passando pela tela de login. Carregue depois do script principal. */
(function(){
var reg=document.getElementById("reg");if(!reg)return;
if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
var st=document.createElement("style");
st.textContent=
'#hv{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:11}'+
'.hv{position:absolute;bottom:6px;left:0;width:120px;will-change:transform}'+
'.hv .hb{position:absolute;left:50%;bottom:112%;transform:translateX(-50%);background:#fff;color:#15233b;font:700 13px/1.3 "Bricolage Grotesque",sans-serif;padding:8px 12px;border-radius:12px;width:max-content;max-width:210px;text-align:center;box-shadow:0 6px 20px #0006;opacity:0;transition:opacity .2s}'+
'.hv .hb:after{content:"";position:absolute;left:50%;top:100%;margin-left:-7px;border:7px solid transparent;border-top-color:#fff}'+
'.hv.say .hb{opacity:1}'+
'.hv img{display:block;width:100%;height:auto;filter:drop-shadow(0 0 10px #39bfff99);transform-origin:50% 100%}'+
'.hv.walk img{animation:hvw .42s ease-in-out infinite}'+
'.hv.dance img{animation:hvd .6s ease-in-out infinite}'+
'.hv.face img{animation:hvf .5s ease-in-out infinite}'+
'@keyframes hvw{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-12px) rotate(3deg)}}'+
'@keyframes hvd{0%{transform:translateY(0) rotate(-10deg) scaleX(1)}25%{transform:translateY(-16px) rotate(0) scaleX(-1)}50%{transform:translateY(0) rotate(10deg) scaleX(-1)}75%{transform:translateY(-16px) rotate(0) scaleX(1)}100%{transform:translateY(0) rotate(-10deg) scaleX(1)}}'+
'@keyframes hvf{0%,100%{transform:scale(1,1) rotate(0)}25%{transform:scale(1.18,.82) rotate(-6deg)}50%{transform:scale(.86,1.16) rotate(6deg)}75%{transform:scale(1.12,.9) rotate(-4deg)}}'+
'@media(max-width:560px){.hv{width:84px}.hv .hb{font-size:12px;max-width:160px}}';
document.head.appendChild(st);
var stage=document.createElement("div");stage.id="hv";stage.setAttribute("aria-hidden","true");document.body.appendChild(stage);
/* índice do herói (0 a 19) -> frase curta */
var FR={0:"Eu não vou desistir!",1:"Aaaah! Eu não quero lutar!",3:"Eu serei o maior espadachim!",4:"Eu vou ser o Rei dos Piratas!",5:"Eu vou ser Hokage! Dattebayo!",7:"Relaxa, eu sou o mais forte.",12:"Um soco só.",14:"Eu sou o príncipe dos Saiyajins!",15:"Kamehameha!"};
var POOL=Object.keys(FR).map(Number);
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function alive(){return !reg.hidden}
function pick(){return POOL[Math.floor(Math.random()*POOL.length)]}
async function act(i,kind){
 var w=innerWidth<560?84:120,fromLeft=Math.random()<.5,el=document.createElement("div"),img=new Image();
 el.className="hv walk";img.alt="";img.src="assets/herois/heroi-"+String(i+1).padStart(2,"0")+".png";
 var hb=document.createElement("div");hb.className="hb";hb.textContent=(kind==="face"?"😝 ":"💃 ")+FR[i];
 el.append(hb,img);stage.appendChild(el);
 var x0=fromLeft?-w-20:innerWidth+20,x1=Math.round(w*.3+Math.random()*(innerWidth-w*1.6));
 el.style.transform="translateX("+x0+"px)";img.style.transform=fromLeft?"":"scaleX(-1)";
 await sleep(60);
 el.style.transition="transform 3.6s linear";el.style.transform="translateX("+x1+"px)";
 await sleep(3700);
 if(!alive()){el.remove();return}
 el.classList.remove("walk");el.classList.add(kind,"say");img.style.transform="";
 await sleep(3600);
 el.classList.remove("say",kind);el.classList.add("walk");
 var x2=x1>innerWidth/2?innerWidth+20:-w-20;img.style.transform=x2<0?"scaleX(-1)":"";
 el.style.transition="transform 3s linear";el.style.transform="translateX("+x2+"px)";
 await sleep(3100);el.remove()}
(async function loop(){
 var first=true;
 while(true){
  if(!alive()){stage.textContent="";await sleep(500);continue}
  if(first){await sleep(1200);if(!alive())continue}
  var i=first?5:pick(),k=first?"face":(Math.random()<.5?"dance":"face");first=false;
  try{await act(i,k)}catch(e){}
  await sleep(1500+Math.random()*3000)}
})();
})();
