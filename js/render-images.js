const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageList = document.querySelector('.pictures');
const imagesListFragment = document.createDocumentFragment();

const renderImages = (images) => {
  images.forEach(({url, likes, comments}) => {
    const imageElement = imageTemplate.cloneNode(true);
    imageElement.querySelector('.picture__img').src = url;
    imageElement.querySelector('.picture__comments').textContent = comments.length;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imagesListFragment.appendChild(imageElement);
  });

  imageList.appendChild(imagesListFragment);
};

export {renderImages};
