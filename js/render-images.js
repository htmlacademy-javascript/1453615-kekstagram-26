import {getImagesData} from './data.js';
import {openPreview} from './open-preview.js';

const imagesData = getImagesData();
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageList = document.querySelector('.pictures');
const imagesListFragment = document.createDocumentFragment();

const onPicturesListClick = (evt) => {
  const targetPicture = evt.target.closest('.picture');

  if (!targetPicture) {
    return;
  }

  evt.preventDefault();
  openPreview(imagesData[targetPicture.dataset.pictureId - 1]);
};

const renderImages = () => {
  imagesData.forEach((image) => {
    const {id, url, likes, comments} = image;

    const imageElement = imageTemplate.cloneNode(true);
    imageElement.dataset.pictureId = id;
    imageElement.querySelector('.picture__img').src = url;
    imageElement.querySelector('.picture__comments').textContent = comments.length;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imagesListFragment.appendChild(imageElement);
  });

  imageList.appendChild(imagesListFragment);
  imageList.addEventListener('click', onPicturesListClick);
};

export {renderImages};
