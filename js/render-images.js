import {openPreview} from './open-preview.js';

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageList = document.querySelector('.pictures');
const imagesListFragment = document.createDocumentFragment();

const renderImages = (images) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  images.forEach((image) => {
    const {id, url, likes, comments} = image;

    const imageElement = imageTemplate.cloneNode(true);
    imageElement.dataset.pictureId = id;
    imageElement.querySelector('.picture__img').src = url;
    imageElement.querySelector('.picture__comments').textContent = comments.length;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imagesListFragment.appendChild(imageElement);
  });

  imageList.appendChild(imagesListFragment);
  imageList.addEventListener('click', (evt) => {
    const targetPicture = evt.target.closest('.picture');

    if (!targetPicture) {
      return;
    }

    evt.preventDefault();
    openPreview(images[targetPicture.dataset.pictureId]);
  });
};

export {renderImages};
