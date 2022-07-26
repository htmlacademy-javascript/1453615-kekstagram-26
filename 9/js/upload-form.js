import {toggleModalView, isEscapeKey} from './utils.js';
import {inputHashtags, inputDescription} from './validate-form.js';
import {onImageUploadEffectChange} from './effects.js';
import {ImageScaleSetting, onImageScallerClick} from './scale.js';

const imageUploadFormSelector = '.img-upload__overlay';
const imageUploadInputElement = document.querySelector('.img-upload__input');
const imageUploadButtomCloseElement = document.querySelector('#upload-cancel');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageScallerOutputElement = document.querySelector('.scale__control--value');
const imageScallerElement = document.querySelector('.img-upload__scale');
const imageEffectsElement = document.querySelector('.img-upload__effects');
const noneEffectControl = document.querySelector('#effect-none');

imageEffectsElement.addEventListener('change', onImageUploadEffectChange);
imageScallerElement.addEventListener('click', onImageScallerClick);

const resetImageUploadForm = () => {
  imageUploadInputElement.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
  imageScallerOutputElement.value = ImageScaleSetting.INITIAL;
  imagePreviewElement.style = 'none';
  imagePreviewElement.removeAttribute('class');
  noneEffectControl.checked = true;
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    toggleModalView(imageUploadFormSelector);
    resetImageUploadForm();
    document.removeEventListener('keydown', onUploadEscapeKeydown);
  }
};

const onImageUploadChange = (evt) => {
  evt.preventDefault();
  toggleModalView(imageUploadFormSelector);
  document.addEventListener('keydown', onUploadEscapeKeydown);
};

const onUploadButtonCloseClick = (evt) => {
  evt.preventDefault();
  toggleModalView(imageUploadFormSelector);
  resetImageUploadForm();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
};

imageUploadButtomCloseElement.addEventListener('click', onUploadButtonCloseClick);

export {onImageUploadChange};
