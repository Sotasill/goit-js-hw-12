import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-function.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const loader = document.querySelector('#loader');
const loadMoreButton = document.querySelector('#load-more-button');

let currentPage = 1;
let currentQuery = '';

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
    currentPage = 1;  // Reset page number for new query
  
    loader.style.display = 'block';
    loadMoreButton.style.display = 'none';  // Hide Load more button
  
    try {
      const images = await fetchImages(currentQuery, currentPage);
      renderImages(images);
  
      if (images.length === 15) {
        loadMoreButton.style.display = 'block';  // Show Load more button if more images available
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
      const images = await fetchImages(currentQuery, currentPage);
      renderImages(images, true); // Append new images to existing ones
  
      if (images.length < 15) {
        loadMoreButton.style.display = 'none';  // Hide Load more button if no more images
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





