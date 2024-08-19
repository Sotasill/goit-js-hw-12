import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderImages(images, append = false) {
  const gallery = document.querySelector('.gallery');
  if (!append) {
    gallery.innerHTML = ''; // Clear existing images if not appending
  }

  if (images.length === 0) {
    showNoImagesMessage();
    return;
  }

  const cardsMarkup = images.map(createImageCard).join('');
  gallery.insertAdjacentHTML('beforeend', cardsMarkup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }

  // Smooth scroll after images are added
  smoothScrollToNewImages();
}

function smoothScrollToNewImages() {
  const gallery = document.querySelector('.gallery');
  const firstNewCard = gallery.lastElementChild;
  if (!firstNewCard) return;

  const cardHeight = firstNewCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2, // Scroll by two card heights
    behavior: 'smooth'   // Smooth scrolling
  });
}

function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="image-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b> ${views}</p>
        <p class="info-item"><b>Comments:</b> ${comments}</p>
        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>
  `;
}