import {isEscapeKey} from './utils.js';
import {renderPicture} from './render-picture.js';

const picturePrewiewElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = picturePrewiewElement.querySelector('#picture-cancel');

const togglePreviewState = () => {
  picturePrewiewElement.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
};

const onPreviewEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    togglePreviewState();

    document.removeEventListener('keydown', onPreviewEscapeKeydown);
  }
};

const onPreviewCloseButtonClick = () => {
  togglePreviewState();

  document.removeEventListener('keydown', onPreviewEscapeKeydown);
};

const openPreview = (picture) => {
  togglePreviewState();

  document.addEventListener('keydown', onPreviewEscapeKeydown);

  renderPicture(picture);
};

pictureCloseButtonElement.addEventListener('click', onPreviewCloseButtonClick);

export {openPreview};
