(function(){
const here=location.pathname.split("/").pop()||"index.html";
const nav=document.getElementById("nav");
if(nav)nav.innerHTML=PAGES.map(([h,l])=>`<a href="${h}"${h===here?' aria-current="page"':""}>${l}</a>`).join("");

const grid=document.getElementById("grid");
if(!grid)return;
const cats=(document.body.dataset.cat||"").split(",");
const list=DOCS.filter(d=>cats.includes("home")?d.h:cats.includes(d.c)).sort((a,b)=>b.y-a.y);

function render(q){
  q=(q||"").toLowerCase();
  const rows=list.filter(d=>(d.t+d.i+d.d+d.y).toLowerCase().includes(q));
  grid.innerHTML=rows.length?rows.map(d=>`<button class="doc" data-f="${d.f}"><img loading="lazy" src="thumbs/${d.f}.jpg" alt="Scan of: ${d.t}"><div><small>${d.y}</small><h3>${d.t}</h3><p>${d.i}</p></div></button>`).join(""):"<p>No documents match your search.</p>";
}
render();
const q=document.getElementById("q");
if(q)q.addEventListener("input",e=>render(e.target.value));

const dlg=document.getElementById("viewer");
grid.addEventListener("click",e=>{
  const b=e.target.closest(".doc");if(!b)return;
  const d=DOCS.find(x=>x.f===b.dataset.f);
  dlg.querySelector(".dlg").innerHTML=`<img src="thumbs/${d.f}.jpg" alt="Scan of: ${d.t}"><div class="tx"><small>${d.y}</small><h2>${d.t}</h2><p><strong>${d.i}</strong></p><p>${d.d}</p><div class="btns"><a class="btn" href="documents/${d.f}.pdf" target="_blank" rel="noopener">Open original scan</a><button class="btn alt" type="button" id="x">Close</button></div></div>`;
  dlg.showModal();
  document.getElementById("x").onclick=()=>dlg.close();
});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
})();
