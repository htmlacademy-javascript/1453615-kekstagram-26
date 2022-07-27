import {getImagesData} from './render-images.js';
import {onImageUploadChange} from './upload-form.js';

document.addEventListener('DOMContentLoaded', () => {
  getImagesData();

  const imageUploadInputElement = document.querySelector('.img-upload__input');
  imageUploadInputElement.addEventListener('change', onImageUploadChange);
});
