import{S as l,i as u}from"./assets/vendor-0fc460d7.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const f="45376910-43038ea3ca87cb1ac327a6384",d="https://pixabay.com/api/";async function m(s){const t=`${d}?key=${f}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`,o=await fetch(t);if(!o.ok)throw new Error("Failed to fetch images");return(await o.json()).hits}let n;function p(s){const t=document.querySelector(".gallery");if(t.innerHTML="",s.length===0){g();return}const o=s.map(a=>y(a)).join("");t.insertAdjacentHTML("beforeend",o),n?n.refresh():n=new l(".gallery a")}function y({webformatURL:s,largeImageURL:t,tags:o,likes:a,views:e,comments:r,downloads:i}){return`
    <div class="image-card">
      <a href="${t}" data-lightbox="image">
        <img src="${s}" alt="${o}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b> ${a}</p>
        <p class="info-item"><b>Views</b> ${e}</p>
        <p class="info-item"><b>Comments</b> ${r}</p>
        <p class="info-item"><b>Downloads</b> ${i}</p>
      </div>
    </div>
  `}function g(){u.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"})}const h=document.querySelector("#search-form"),b=document.querySelector("#search-input"),c=document.querySelector("#loader");h.addEventListener("submit",async s=>{s.preventDefault();const t=b.value.trim();if(t===""){iziToast.warning({title:"Warning",message:"Please enter a search query!"});return}c.style.display="block";try{const o=await m(t);p(o)}catch{iziToast.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{c.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
