import {closeModal, openModal, isEscapeKey} from './utils.js';
import {inputHashtags, inputDescription} from './validate-form.js';
import {onImageUploadEffectChange} from './effects.js';
import {ImageScaleSetting, onImageScallerClick} from './scale.js';
import {createRequest} from './fetch.js';
import './upload-photo.js';

const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';
const SubmitButton = {
  NORMAL_TEXT: 'Опубликовать',
  SEND_TEXT: 'Публикуем...'
};

const imageUploadFormSelector = '.img-upload__overlay';
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadInputElement = document.querySelector('.img-upload__input');
const imageUploadButtomCloseElement = document.querySelector('#upload-cancel');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageScallerOutputElement = document.querySelector('.scale__control--value');
const imageScallerElement = document.querySelector('.img-upload__scale');
const imageEffectsElement = document.querySelector('.img-upload__effects');
const noneEffectControl = document.querySelector('#effect-none');
const uploadSubmitButton = document.querySelector('#upload-submit');
const imageEffectControl = document.querySelector('.img-upload__effect-level');

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
  imageEffectControl.classList.add('hidden');
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.querySelector(`.${ERROR_CLASS}`)) {
    resetImageUploadForm();
    closeModal(imageUploadFormSelector);
    document.removeEventListener('keydown', onUploadEscapeKeydown);
  }
};

const onImageUploadChange = (evt) => {
  evt.preventDefault();
  openModal(imageUploadFormSelector);
  document.addEventListener('keydown', onUploadEscapeKeydown);
};

const onUploadButtonCloseClick = (evt) => {
  evt.preventDefault();
  closeModal(imageUploadFormSelector);
  resetImageUploadForm();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
};

imageUploadButtomCloseElement.addEventListener('click', onUploadButtonCloseClick);

const showAlert = (selector) => {
  const alertTemplate = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
  const alertElement = alertTemplate.cloneNode(true);
  const alertSubmitButtonElement = alertElement.querySelector(`.${selector}__button`);
  document.body.appendChild(alertElement);

  const alertClose = () => {
    alertSubmitButtonElement.removeEventListener('click', onAlertSubmitButtonClick);
    alertElement.removeEventListener('click', onAlertOverlayClick);
    alertElement.remove();
    document.removeEventListener('keydown', onAlertEccapeKeydown);
    if (selector === ERROR_CLASS) {
      imageUploadOverlayElement.classList.remove('hidden');
    }
  };

  function onAlertEccapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      alertClose();
    }
  }

  function onAlertSubmitButtonClick () {
    alertClose();
  }

  function onAlertOverlayClick (evt) {
    if (evt.target.closest(`#${selector}`) || !evt.target.closest(`.${selector}__inner`)) {
      alertClose();
    }
  }

  alertSubmitButtonElement.addEventListener('click', onAlertSubmitButtonClick);
  alertElement.addEventListener('click', onAlertOverlayClick);
  document.addEventListener('keydown', onAlertEccapeKeydown);
};

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = SubmitButton.SEND_TEXT;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = SubmitButton.NORMAL_TEXT;
};

const onFormSuccessSubmit = () => {
  showAlert(SUCCESS_CLASS);
  resetImageUploadForm();
  closeModal(imageUploadFormSelector);
  unblockSubmitButton();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
};

const onFormErrorSubmit = () => {
  imageUploadOverlayElement.classList.add('hidden');
  showAlert(ERROR_CLASS);
  unblockSubmitButton();
};

const postUploadForm = () => createRequest(onFormSuccessSubmit, onFormErrorSubmit, 'POST', new FormData(imageUploadFormElement));

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  postUploadForm();
};

imageUploadFormElement.addEventListener('submit', onUploadFormSubmit);

export {onImageUploadChange};
