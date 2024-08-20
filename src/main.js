import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const loader = document.querySelector('#loader');
const loadMoreButton = document.querySelector('#load-more-button');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;  
  loadedHits = 0;  

  loader.style.display = 'block';
  loadMoreButton.style.display = 'none';  

  try {
    const { images, totalHits: hits } = await fetchImages(currentQuery, currentPage);
    
    
    if (images && hits) {
      totalHits = hits;
      loadedHits += images.length;

      renderImages(images);

      if (loadedHits < totalHits) {
        loadMoreButton.style.display = 'block';  
      } else if (loadedHits === totalHits) {
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } else {
      
      iziToast.warning({
        title: 'Warning',
        message: 'No images found. Please try a different search query.',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  loader.style.display = 'block';

  try {
    const { images } = await fetchImages(currentQuery, currentPage);
    loadedHits += images.length;

    renderImages(images, true);  

    if (loadedHits >= totalHits) {
      loadMoreButton.style.display = 'none';  
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});