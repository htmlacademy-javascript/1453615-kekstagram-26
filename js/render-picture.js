import {numDecline} from './utils.js';

const INITIAL_LOADED_COMMENTS = 5;

const numDeclineComments = (num) => numDecline(num, 'комментария', 'комментариев', 'комментариев');
const pictureElement = document.querySelector('.big-picture');

const renderImagePrewiew = ({url, description, likes}) => {
  const pictureImgElement = pictureElement.querySelector('.big-picture__img img');
  const pictureCaptionElement = pictureElement.querySelector('.social__caption');
  const pictureLikesCountElement = pictureElement.querySelector('.likes-count');

  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureCaptionElement.textContent = description;
  pictureLikesCountElement.textContent = likes;
};

const renderComments = ({comments}) => {
  const pictureCommentCountElement = pictureElement.querySelector('.social__comment-count');
  const commentsLoaderButton = pictureElement.querySelector('.social__comments-loader');
  const commentsListElement = pictureElement.querySelector('.social__comments');
  const commentsListFragment = document.createDocumentFragment();
  const commentTemplate = pictureElement.querySelector('.social__comment');

  const commentsCount = comments.length;
  const loadedCommentsCount = (commentsCount < INITIAL_LOADED_COMMENTS) ? commentsCount : INITIAL_LOADED_COMMENTS;
  pictureCommentCountElement.textContent = `${loadedCommentsCount} из ${commentsCount} ${numDeclineComments(commentsCount)}`;
  pictureCommentCountElement.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  commentsListElement.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const socialPicture = commentElement.querySelector('.social__picture');

    socialPicture.src = avatar;
    socialPicture.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsListFragment.appendChild(commentElement);
  });

  commentsListElement.appendChild(commentsListFragment);
};

const renderPicture = (picture) => {
  renderImagePrewiew(picture);
  renderComments(picture);
};

export {renderPicture};
