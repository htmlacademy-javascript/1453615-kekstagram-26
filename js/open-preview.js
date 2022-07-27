import {isEscapeKey, closeModal, openModal} from './utils.js';
import {renderPicture, onCommentsLoadButtonClick} from './render-picture.js';

const pictureCloseButtonElement = document.querySelector('#picture-cancel');
const commentsLoaderButtonElement = document.querySelector('.social__comments-loader');

const madalPreviewSelector = '.big-picture';

const onPreviewEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal(madalPreviewSelector);

    document.removeEventListener('keydown', onPreviewEscapeKeydown);
    commentsLoaderButtonElement.removeEventListener('click', onCommentsLoadButtonClick);
  }
};

const onPreviewCloseButtonClick = () => {
  closeModal(madalPreviewSelector);

  document.removeEventListener('keydown', onPreviewEscapeKeydown);
  commentsLoaderButtonElement.removeEventListener('click', onCommentsLoadButtonClick);

};

const openPreview = (picture) => {
  openModal(madalPreviewSelector);

  document.addEventListener('keydown', onPreviewEscapeKeydown);

  renderPicture(picture);
  commentsLoaderButtonElement.addEventListener('click', onCommentsLoadButtonClick);
};

pictureCloseButtonElement.addEventListener('click', onPreviewCloseButtonClick);

export {openPreview};
