import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{S as n,i as s}from"./assets/vendor-B2mb6eXk.js";const t=document.querySelector(".search-form"),l=document.querySelector(".gallery"),r=document.querySelector(".loader"),c=new n(".gallery a",{captions:!0,captionsData:"alt"});t.addEventListener("submit",async i=>{i.preventDefault();const o=t.elements.search.value.trim();if(o===""){s.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}r.classList.remove("hidden");const a=await(await fetch(`https://pixabay.com/api/?key=54641867-0b2bd143cc574463d0ab3cc86&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`)).json();a.hits.length===0&&s.error({title:"Error",message:"Sorry, there are no images matching <br> your search query. Please try again.",position:"topRight",color:"#EF4040",textWrapping:!0}),r.classList.add("hidden"),l.innerHTML=a.hits.map(e=>`<div class="photo-card">
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
    </div>`).join(""),c.refresh(),console.log(a)});
//# sourceMappingURL=page-2.js.map
