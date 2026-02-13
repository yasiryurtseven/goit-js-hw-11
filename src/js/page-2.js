import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const value = form.elements.search.value.trim();
  if (value === '') {
    iziToast.error({
      title: `Error`,
      message: `Please enter a search query!`,
      position: 'topRight',
    });
    return;
  }
  loader.classList.remove('hidden');

  const response = await fetch(
    `https://pixabay.com/api/?key=54641867-0b2bd143cc574463d0ab3cc86&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  const data = await response.json();
  if (data.hits.length === 0) {
    iziToast.error({
      title: `Error`,
      message: `Sorry, there are no images matching <br> your search query. Please try again.`,
      position: `topRight`,
      color: '#EF4040',
      textWrapping: true,
    });
  }
  loader.classList.add('hidden');

  gallery.innerHTML = data.hits
    .map(
      hit => `<div class="photo-card">
      <a href= "${hit.largeImageURL}">
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      </a>
      
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${hit.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${hit.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${hit.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${hit.downloads}
        </p>
      </div>
    </div>`
    )
    .join('');
  lightbox.refresh();
  console.log(data);
});
