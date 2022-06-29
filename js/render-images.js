const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageList = document.querySelector('.pictures');
const imagesListFragment = document.createDocumentFragment();

const renderImages = (images) => {
  images.forEach((image) => {
    const imageElement = imageTemplate.cloneNode(true);
    imageElement.querySelector('.picture__img').src = image.url;
    imageElement.querySelector('.picture__comments').textContent = image.comments.length;
    imageElement.querySelector('.picture__likes').textContent = image.likes;
    imagesListFragment.appendChild(imageElement);
  });

  imageList.appendChild(imagesListFragment);
};

export {renderImages};
