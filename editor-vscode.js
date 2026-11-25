/* PyQuest: terminal de código no estilo VS Code. Carregue depois do script principal. */
(function(){
var ed=document.getElementById("ed");if(!ed||!ed.parentNode)return;
var st=document.createElement("style");
st.textContent=
'.ide{border:1px solid #3c3c3c;border-radius:12px;overflow:hidden;background:#1e1e1e;box-shadow:0 10px 30px #0006}'+
'.ide-tabs{display:flex;background:#252526;font:12px "Atkinson Hyperlegible",sans-serif;color:#9d9d9d}'+
'.ide-tab{padding:8px 16px;background:#1e1e1e;color:#fff;border-top:2px solid #007acc}'+
'.ide-body{display:flex}'+
'.ide .gt,.ide .hl,.ide .code{font:500 14px/1.7 "JetBrains Mono",ui-monospace,monospace;tab-size:4;white-space:pre;margin:0}'+
'.ide .gt{width:48px;flex:none;padding:14px 12px 14px 0;text-align:right;color:#6e7681;overflow:hidden;user-select:none}'+
'.ide .ea{position:relative;flex:1;min-width:0}'+
'.ide .hl,.ide .code{padding:14px 14px 14px 10px}'+
'.ide .hl{position:absolute;inset:0;overflow:hidden;pointer-events:none;color:#d4d4d4}'+
'.ide .code{position:relative;z-index:1;display:block;width:100%;min-height:340px;background:transparent;color:transparent;caret-color:#aeafad;border:0;border-radius:0;box-shadow:none;overflow:auto;resize:vertical}'+
'.ide .code:focus{outline:0}.ide .code::selection{background:#264f78;color:transparent}'+
'.ide-bar{display:flex;justify-content:space-between;background:#007acc;color:#fff;font:11px "Atkinson Hyperlegible",sans-serif;padding:3px 12px}'+
'.tk-c{color:#6a9955}.tk-s{color:#ce9178}.tk-n{color:#b5cea8}.tk-k{color:#569cd6}.tk-k2{color:#c586c0}.tk-f{color:#dcdcaa}.tk-v{color:#9cdcfe}'+
'@media(max-width:560px){.ide .gt,.ide .hl,.ide .code{font-size:12px}.ide .gt{width:38px;padding-top:12px;padding-bottom:12px}.ide .hl,.ide .code{padding:12px}.ide .code{min-height:270px}}';
document.head.appendChild(st);
var ide=document.createElement("div"),last=null;ide.className="ide";
ide.innerHTML='<div class="ide-tabs"><div class="ide-tab">🐍 main.py</div></div><div class="ide-body"><pre class="gt" aria-hidden="true"></pre><div class="ea"><pre class="hl" aria-hidden="true"></pre></div></div><div class="ide-bar"><span class="idepos">Ln 1, Col 1</span><span>Espaços: 4 · UTF-8 · Python</span></div>';
ed.parentNode.insertBefore(ide,ed);
var ea=ide.querySelector(".ea"),hl=ide.querySelector(".hl"),gt=ide.querySelector(".gt"),pos=ide.querySelector(".idepos");
ea.appendChild(ed);ed.setAttribute("wrap","off");
var CTRL=/^(if|elif|else|for|while|return|break|continue|import|from|pass)$/,KW=/^(def|in|and|or|not|is|True|False|None|lambda)$/;
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function hi(src){var re=/(#[^\n]*)|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|([\s\S])/g,o="",m;
 while((m=re.exec(src))){var t=m[0];
  if(m[1])o+='<span class="tk-c">'+esc(t)+'</span>';
  else if(m[2])o+='<span class="tk-s">'+esc(t)+'</span>';
  else if(m[3])o+='<span class="tk-n">'+t+'</span>';
  else if(m[4]){var c=CTRL.test(t)?"tk-k2":KW.test(t)?"tk-k":src.charAt(re.lastIndex)==="("?"tk-f":"tk-v";o+='<span class="'+c+'">'+t+'</span>'}
  else o+=esc(t)}
 return o}
function sync(){hl.scrollTop=gt.scrollTop=ed.scrollTop;hl.scrollLeft=ed.scrollLeft}
function where(){var l=ed.value.slice(0,ed.selectionStart).split("\n");pos.textContent="Ln "+l.length+", Col "+(l[l.length-1].length+1)}
function render(){last=ed.value;hl.innerHTML=hi(last)+"\n";var n=last.split("\n").length,g="";for(var i=1;i<=n;i++)g+=i+"\n";gt.textContent=g;sync();where()}
ed.addEventListener("input",render);ed.addEventListener("scroll",sync);
["keyup","click","focus"].forEach(function(ev){ed.addEventListener(ev,where)});
ed.addEventListener("keydown",function(e){
 if(e.ctrlKey||e.metaKey||e.altKey)return;
 var P={"(":")","[":"]",'"':'"',"'":"'"},s=ed.selectionStart,t=ed.selectionEnd,v=ed.value,k=e.key,nx=v.charAt(s);
 if(s!==t)return;
 if((k===")"||k==="]"||k==='"'||k==="'")&&nx===k){e.preventDefault();ed.selectionStart=ed.selectionEnd=s+1;where();return}
 if(P[k]){if((k==='"'||k==="'")&&(/\w/.test(v.charAt(s-1))||(nx&&!/[\s)\]]/.test(nx))))return;
  e.preventDefault();ed.setRangeText(k+P[k],s,s,"end");ed.selectionStart=ed.selectionEnd=s+1;render()}});
(function loop(){if(ed.value!==last)render();requestAnimationFrame(loop)})();
render();
})();
