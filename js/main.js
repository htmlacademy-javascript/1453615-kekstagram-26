import {renderImages} from './render-images.js';
import {onImageUploadChange} from './upload-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const imageUploadInputElement = document.querySelector('.img-upload__input');

  renderImages();

  imageUploadInputElement.addEventListener('change', onImageUploadChange);
});
