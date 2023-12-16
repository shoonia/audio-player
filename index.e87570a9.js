var e;let t,r,a,l,n,i,s;const c=(e,t)=>{Array.isArray(e)?e.some(e=>c(e,t)):null!=e&&!1!==e&&t.append(e)},u=e=>{let t=new DocumentFragment;return c(e,t),t},o=new Set(["ns","children","ref"]),d=new Map([["style",(e,t,r)=>{if("string"==typeof t)e.setAttribute(r,t);else for(r in t)r.startsWith("--")?e.style.setProperty(r,t[r]):e.style[r]=t[r]}]]),p=new Set(["value"]),m=(e,t)=>{let r,a,l=t.ns?document.createElementNS(t.ns,e):document.createElement(e);for(r in t)!o.has(r)&&(a=t[r],d.has(r)?d.get(r)(l,a,r):p.has(r)||r.startsWith("on")?l[r]=a:null!=a&&("boolean"!=typeof a||"-"===r[4])?l.setAttribute(r,a):a&&l.setAttribute(r,""));return c(t.children,"template"===e?l.content:l),(r=t.ref)&&("function"==typeof r?r(l):r.current=l),l},y=e=>Object.seal({current:e}),h=e=>{let t=new Text(e);return[t,r=>{e!==r&&(t.textContent=e=r)}]},{readyStore:f,dispatch:b,connect:g}=(e=[e=>{e.on("@init",()=>({url:localStorage.getItem("audio-player-url")??"",time:~~Number(localStorage.getItem("audio-player-time"))})),e.on("set/url",({url:e},t)=>{if(e!==t)return localStorage.setItem("audio-player-url",t),localStorage.removeItem("audio-player-time"),{url:t,time:0}}),e.on("set/time",({time:e},t)=>{if(e!==t)return localStorage.setItem("audio-player-time",String(t)),{time:t}})}],t={},r={},a=[],l=(e,a)=>{if("@dispatch"!==e&&l("@dispatch",[e,a]),t[e]){let n;t[e].forEach(e=>{let t=e(r,a);t&&"function"!=typeof t.then&&(r={...r,...t},n={...n,...t})}),n&&l("@changed",n)}},n=(e,r)=>((t[e]??=[]).push(r),()=>{t[e]=t[e].filter(e=>e!==r)}),i=()=>r,s=e=>l("@set",e),n("@set",(e,t)=>t),e.forEach(e=>{e&&e({dispatch:l,on:n,get:i,set:s})}),l("@init"),{dispatch:l,getState:i,setState:s,connect(...e){let t=e.pop();return a.push({keys:e,cb:t}),()=>{a=a.filter(e=>e.cb!==t)}},readyStore:()=>(l("@ready"),n("@changed",(e,t)=>{a.forEach(e=>{e.keys.some(e=>e in t)&&e.cb(r)})}),Promise.all(a.map(e=>e.cb(r))))}),v=e=>(e<10?"0":"")+e,S=e=>`${v(~~(e/3600))}:${v(~~(e%3600/60))}:${v(e%60)}`;document.body.append(m("main",{ref:f,class:"_6Wd0w",children:[m("h1",{class:"_TW-iW",children:"Audio Player"}),(()=>{let e=y();return g("url",t=>{e.current.value=t.url}),m("div",{class:"_7vM1s",children:[m("label",{class:"_KbgC5","aria-label":"audio source",children:m("input",{ref:e,class:"_Pa4ru",type:"url",autocomplete:"url"})}),m("button",{type:"button",class:"_d0Tje",onclick:()=>b("set/url",e.current.value),"aria-label":"add",children:"+"})]})})({}),(()=>{let e=S(0),t=y(),[r,a]=h("Play"),[l,n]=h(e),[i,s]=h(e);return u([m("div",{class:"_6Jh6R",children:[m("audio",{ref:e=>{let r;let l=()=>{let t=~~e.currentTime;s(S(t)),b("set/time",t)};e.addEventListener("play",()=>{r=setInterval(l,1e3),a("Pause")}),e.addEventListener("pause",()=>{clearInterval(r),l(),a("Play")}),e.addEventListener("canplay",()=>{t.current.disabled=!1,a("Play"),n(S(~~e.duration))}),g("url",t=>{e.src=t.url,e.currentTime=t.time});let i=g(()=>{i(),t.current.addEventListener("click",()=>{e.paused?e.play():e.pause()})})},preload:"metadata"}),m("strong",{children:l})," / ",i]}),m("button",{ref:t,class:"_yt09E",type:"button",disabled:"",children:r})])})({})]}));