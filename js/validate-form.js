import {stopEscapeOnFocus, checkStringLength} from './utils.js';

const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_SYMBOLS = 140;

const formUpload = document.querySelector('.img-upload__form');
const formUploadSubmit = document.querySelector('.img-upload__submit');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const formSubminIsDisable = () => {
  formUploadSubmit.disabled = !pristine.validate();
};

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: inputArray.some((item) => item[0] === '#' && item.length === 1),
      error: 'Хэш-тег не может состоять только из одной решетки'
    },
    {
      check: inputArray.some((item) => checkStringLength(item, MAX_HASHTAG_SYMBOLS)),
      error: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_SYMBOLS} символов, включая решетку`
    },
    {
      check: inputArray.length > MAX_HASHTAGS_COUNT,
      error: `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtags, hashtagsHandler, error, 2, false);

const onHashtagInput = () => {
  formSubminIsDisable();
};

const onHashtagsKeydown = (evt) => {
  stopEscapeOnFocus(evt);
};

inputHashtags.addEventListener('input', onHashtagInput);
inputHashtags.addEventListener('keydown', onHashtagsKeydown);

const descriptionHandler = (value) => {
  errorMessage = '';
  const inputText = value.trim();
  const isInvalid = checkStringLength(inputText, MAX_DESCRIPTION_SYMBOLS);

  if (isInvalid) {
    errorMessage = `Максимальная длина комментария ${MAX_DESCRIPTION_SYMBOLS} символов`;
  }

  return !isInvalid;
};

pristine.addValidator(inputDescription, descriptionHandler, error, 2, false);

const onDescriptionInput = () => {
  formUploadSubmit.disabled = !pristine.validate();
};

const onDescriptionKeydown = (evt) => {
  stopEscapeOnFocus(evt);
};

inputDescription.addEventListener('input', onDescriptionInput);
inputDescription.addEventListener('keydown', onDescriptionKeydown);

export {inputHashtags, inputDescription};
