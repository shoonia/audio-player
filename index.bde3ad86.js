var e;let t,r,a,l,n,s,i;const c=(e,t)=>{Array.isArray(e)?e.some(e=>c(e,t)):null!=e&&!1!==e&&t.append(e)},o=new Set(["ns","children","ref"]),u=new Map([["style",(e,t,r)=>{if("string"==typeof t)e.setAttribute(r,t);else for(r in t)r.startsWith("--")?e.style.setProperty(r,t[r]):e.style[r]=t[r]}]]),d=new Set(["value"]),p=(e,t)=>{let r,a,l=t.ns?document.createElementNS(t.ns,e):document.createElement(e);for(r in t)!o.has(r)&&(a=t[r],u.has(r)?u.get(r)(l,a,r):d.has(r)||r.startsWith("on")?l[r]=a:null!=a&&("boolean"!=typeof a||"-"===r[4])?l.setAttribute(r,a):a&&l.setAttribute(r,""));return c(t.children,"template"===e?l.content:l),(r=t.ref)&&("function"==typeof r?r(l):r.current=l),l},m=e=>Object.seal({current:e}),y=e=>{let t=new Text(e);return[t,r=>{e!==r&&(t.textContent=e=r)}]},{readyStore:h,dispatch:f,connect:b}=(e=[e=>{e.on("@init",()=>({url:localStorage.getItem("audio-player-url")??"",time:~~Number(localStorage.getItem("audio-player-time"))})),e.on("set/url",({url:e},t)=>{if(e!==t)return localStorage.setItem("audio-player-url",t),localStorage.removeItem("audio-player-time"),{url:t,time:0}}),e.on("set/time",({time:e},t)=>{if(e!==t)return localStorage.setItem("audio-player-time",String(t)),{time:t}})}],t={},r={},a=[],l=(e,a)=>{if("@dispatch"!==e&&l("@dispatch",[e,a]),t[e]){let n;t[e].forEach(e=>{let t=e(r,a);t&&"function"!=typeof t.then&&(r={...r,...t},n={...n,...t})}),n&&l("@changed",n)}},n=(e,r)=>((t[e]??=[]).push(r),()=>{t[e]=t[e].filter(e=>e!==r)}),s=()=>r,i=e=>l("@set",e),n("@set",(e,t)=>t),e.forEach(e=>{e&&e({dispatch:l,on:n,get:s,set:i})}),l("@init"),{dispatch:l,getState:s,setState:i,connect(...e){let t=e.pop();return a.push({keys:e,cb:t}),()=>{a=a.filter(e=>e.cb!==t)}},readyStore:()=>(l("@ready"),n("@changed",(e,t)=>{a.forEach(e=>{e.keys.some(e=>e in t)&&e.cb(r)})}),Promise.all(a.map(e=>e.cb(r))))});document.body.append(p("main",{ref:h,class:"a",children:[p("h1",{class:"b",children:"Audio Player"}),(()=>{let e=m();return b("url",t=>{e.current.value=t.url}),p("div",{class:"c",children:[p("label",{class:"d","aria-label":"audio source",children:p("input",{ref:e,class:"e",type:"url",autocomplete:"url"})}),p("button",{type:"button",class:"f",onclick:()=>f("set/url",e.current.value),"aria-label":"add",children:"+"})]})})({}),(()=>{let[e,t]=y("Play"),r=m();return p("div",{children:[p("audio",{ref:e=>{let a;let l=()=>f("set/time",~~e.currentTime);e.addEventListener("play",()=>{a=setInterval(l,1e3),t("Pause")}),e.addEventListener("pause",()=>{clearInterval(a),l(),t("Play")}),e.addEventListener("canplay",()=>{r.current.disabled=!1,t("Play")}),b("url",t=>{e.src=t.url,e.currentTime=t.time});let n=b(()=>{r.current.addEventListener("click",()=>{e.paused?e.play():e.pause()}),n()})},class:"a",preload:"metadata",controls:"",controlslist:"nodownload"}),p("div",{children:p("button",{ref:r,class:"b",type:"button",disabled:"",children:e})})]})})({})]}));