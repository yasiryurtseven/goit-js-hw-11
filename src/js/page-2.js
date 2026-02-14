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

form.addEventListener('submit', event => {
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
  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  fetch(
    `https://pixabay.com/api/?key=54641867-0b2bd143cc574463d0ab3cc86&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, threre are no images matching your search query. Please try again',
          position: 'topRight',
        });
        return;
      }
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
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: `Something went wrong. Please try again later.`,
        position: 'topRight',
      });
    })
    .finally(() => {
      loader.classList.add('hidden');
      form.reset();
    });
});
