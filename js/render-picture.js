import {numDecline} from './utils.js';

const INITIAL_LOADED_COMMENTS = 5;
const ADD_COMMENTS_COUNTER = 5;

const numDeclineComments = (num) => numDecline(num, 'комментария', 'комментариев', 'комментариев');

const pictureImgElement = document.querySelector('.big-picture__img img');
const pictureCaptionElement = document.querySelector('.social__caption');
const pictureLikesCountElement = document.querySelector('.likes-count');

const pictureCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.social__comments-loader');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();

let loadedCommentsCount = 0;
let commentsArray = [];

const renderImagePrewiew = ({id, url, description, likes}) => {
  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureImgElement.dataset.pictureId = id;
  pictureCaptionElement.textContent = description;
  pictureLikesCountElement.textContent = likes;
};

const renderCommentsCouner = (count, loadedCount) => {
  if (count <= loadedCount) {
    commentsLoaderButton.classList.add('hidden');
    loadedCount = count;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  pictureCommentCountElement.textContent = `${loadedCount} из ${count} ${numDeclineComments(count)}`;
};

const renderComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const socialPicture = commentElement.querySelector('.social__picture');
  const socialCommentText = commentElement.querySelector('.social__text');

  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialCommentText.textContent = message;
  commentsListFragment.appendChild(commentElement);
};

const renderComments = (comments, count) => {
  commentsListElement.innerHTML = '';

  const currentCount = count >= comments.length ? comments.length : count;

  for (let i = 0; i < currentCount; i++) {
    renderComment(comments[i]);
  }

  commentsListElement.appendChild(commentsListFragment);
  renderCommentsCouner(comments.length, count);
};

function onCommentsLoadButtonClick () {
  loadedCommentsCount += ADD_COMMENTS_COUNTER;
  renderComments(commentsArray, loadedCommentsCount);
}

function renderPicture (picture) {
  const commentsCount = picture.comments.length;
  loadedCommentsCount = commentsCount <= INITIAL_LOADED_COMMENTS ? commentsCount : INITIAL_LOADED_COMMENTS;

  renderImagePrewiew(picture);
  renderCommentsCouner(commentsCount, loadedCommentsCount);

  commentsArray = picture.comments;
  renderComments(commentsArray, loadedCommentsCount);
}

export {renderPicture, renderComments, onCommentsLoadButtonClick};
