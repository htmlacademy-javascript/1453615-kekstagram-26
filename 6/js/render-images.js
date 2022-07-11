import {getImagesData} from './data.js';
import {openPreview} from './open-preview.js';

const imagesData = getImagesData();
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageList = document.querySelector('.pictures');
const imagesListFragment = document.createDocumentFragment();

const openTargetPicturePreview = (targetId) => openPreview(imagesData[targetId - 1]);

const onPicturesListClick = (evt) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  evt.preventDefault();
  openTargetPicturePreview(picture.dataset.pictureId);
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
