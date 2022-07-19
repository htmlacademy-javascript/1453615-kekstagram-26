import {toggleModalView, isEscapeKey} from './utils.js';
import {inputHashtags, inputDescription} from './validate-form.js';

const imageUploadFormSelector = '.img-upload__overlay';

const imageUploadInputElement = document.querySelector('.img-upload__input');
const imageUploadButtomCloseElement = document.querySelector('#upload-cancel');

const imageEffectsElement = document.querySelector('.img-upload__effects');

const resetImageUploadForm = () => {
  imageUploadInputElement.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
  imageEffectsElement.value = 'none';
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
