import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{S as l,i as t}from"./assets/vendor-B2mb6eXk.js";const a=document.querySelector(".search-form"),s=document.querySelector(".gallery"),i=document.querySelector(".loader"),c=new l(".gallery a",{captions:!0,captionsData:"alt"});a.addEventListener("submit",n=>{n.preventDefault();const o=a.elements.search.value.trim();if(o===""){t.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}s.innerHTML="",i.classList.remove("hidden"),fetch(`https://pixabay.com/api/?key=54641867-0b2bd143cc574463d0ab3cc86&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0){t.error({title:"Error",message:"Sorry, threre are no images matching your search query. Please try again",position:"topRight"});return}s.innerHTML=r.hits.map(e=>`<div class="photo-card">
      <a href= "${e.largeImageURL}">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${e.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${e.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${e.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${e.downloads}
        </p>
      </div>
    </div>`).join(""),c.refresh()}).catch(()=>{t.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{i.classList.add("hidden"),a.reset()})});
//# sourceMappingURL=page-2.js.map
