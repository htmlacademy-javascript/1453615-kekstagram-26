import {shuffleArray, debounce} from './utils.js';
import {renderImages} from './render-images.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed',
};

const sortingFilter = document.querySelector('.img-filters');
const sortingFilterForm = document.querySelector('.img-filters__form');

const getDefaultImages = (images) => renderImages(images.slice());

const getRandomImages = (images) => {
  const randomImages = shuffleArray(images.slice());
  renderImages(randomImages.slice(0, RANDOM_PHOTOS_COUNT));
};

const compareComments = (imageA, imageB) => imageB.comments.length - imageA.comments.length;

const getPopularImages = (images) => renderImages(images.slice().sort(compareComments));

const getFilteredImages = (images, filter) => {
  switch (filter) {
    case Filter.DEFAULT:
      getDefaultImages(images);
      break;
    case Filter.RANDOM:
      getRandomImages(images);
      break;
    case Filter.POPULAR:
      getPopularImages(images);
      break;
  }
};

const debouncedGetFilteredImages = debounce(getFilteredImages, DEBOUNCE_DELAY);

const filterImages = (images) => {
  sortingFilterForm.addEventListener('click', (evt) => {
    const targetFilterId = evt.target.id;
    debouncedGetFilteredImages(images, targetFilterId);
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  });
  sortingFilter.classList.remove('img-filters--inactive');
};

export {filterImages};
