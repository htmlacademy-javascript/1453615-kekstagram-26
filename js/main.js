import {renderImages} from './render-images.js';
import {onImageUploadChange} from './upload-form.js';
import {filterImages} from './image-filter.js';
import {getData} from './fetch.js';
import {showErrorAlert} from './utils.js';

getData((images) => {
  renderImages(images);
  filterImages(images);
},
(message) => {
  showErrorAlert(message);
});

const imageUploadInputElement = document.querySelector('.img-upload__input');
imageUploadInputElement.addEventListener('change', onImageUploadChange);
