const $=s=>document.querySelector(s);
let muted=false, enabled=true, volume=.62;
const info={
 home:["JARVIS","Vyber jednu z funkcí."],
 music:["Hudba","Apple Music bude později napojená přímo na JARVIS Core."],
 calendar:["Kalendář","Zde budou události a jejich správa."],
 reminders:["Úkoly","Zde budou Apple Připomínky a lokální úkoly."],
 memory:["Paměť","Přehled uložených informací a správa paměti."],
 settings:["Nastavení","Bezpečnost, připojení, hlas, Raspberry Pi a další nastavení."]
};
function selectTab(tab){
 document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
 const x=info[tab]||info.home; $("#panelTitle").textContent=x[0]; $("#panelText").textContent=x[1];
 if(tab!=="home") $("#status").textContent=x[0].toUpperCase();
}
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>selectTab(b.dataset.tab)));
$("#send").onclick=send;
$("#command").addEventListener("keydown",e=>{if(e.key==="Enter")send()});
function send(){
 const v=$("#command").value.trim(); if(!v)return;
 $("#last").textContent="Poslední příkaz: "+v;
 $("#status").textContent="ZPRACOVÁVÁM PŘÍKAZ";
 setTimeout(()=>$("#status").textContent="SYSTÉM PŘIPRAVEN",800);
 $("#command").value="";
}
$("#power").onclick=()=>{
 enabled=!enabled;
 $("#jarvisState").textContent=enabled?"Aktivní":"Vypnuto";
 $("#status").textContent=enabled?"JARVIS ONLINE":"JARVIS VYPNUT";
};
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
