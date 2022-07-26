import {numDecline} from './utils.js';

const INITIAL_LOADED_COMMENTS = 5;
const ADD_COMMENTS_COUNTER = 5;

const numDeclineComments = (num) => numDecline(num, 'комментария', 'комментариев', 'комментариев');

const picturePreviewElement = document.querySelector('.big-picture');
const pictureImgElement = picturePreviewElement.querySelector('.big-picture__img img');
const pictureCaptionElement = picturePreviewElement.querySelector('.social__caption');
const pictureLikesCountElement = picturePreviewElement.querySelector('.likes-count');

const pictureCommentCountElement = picturePreviewElement.querySelector('.social__comment-count');
const commentsLoaderButton = picturePreviewElement.querySelector('.social__comments-loader');
const commentsListElement = picturePreviewElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
const socialPicture = commentTemplate.querySelector('.social__picture');
const socialCommentText = commentTemplate.querySelector('.social__text');

let loadedCommentsCount;
let commentsArray = [];

const renderImagePrewiew = ({url, description, likes}) => {
  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureCaptionElement.textContent = description;
  pictureLikesCountElement.textContent = likes;
};

const renderCommentsCouner = (count, loadedCount) => {
  if (count <= loadedCount && !commentsLoaderButton.classList.contains('hidden')) {
    commentsLoaderButton.classList.add('hidden');
    loadedCount = count;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  pictureCommentCountElement.textContent = `${loadedCount} из ${count} ${numDeclineComments(count)}`;
};

const renderComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialCommentText.textContent = message;
  commentsListFragment.appendChild(commentElement);
};

const renderComments = (comments, count) => {
  const currentCount = count >= comments.length ? comments.length : count;

  for (let i = loadedCommentsCount - ADD_COMMENTS_COUNTER; i < currentCount; i++) {
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
  loadedCommentsCount = INITIAL_LOADED_COMMENTS;
  const commentsCount = picture.comments.length;

  renderImagePrewiew(picture);
  renderCommentsCouner(commentsCount, loadedCommentsCount);

  commentsListElement.innerHTML = '';
  commentsArray = picture.comments;
  renderComments(commentsArray, loadedCommentsCount);
}

export {renderPicture, renderComments, onCommentsLoadButtonClick};
