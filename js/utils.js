const ALERT_TIMEOUT = 3000;

const getRandomInt = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (1 + max - min)) + min;
};

const getRandomIntArray = (length, minValue, maxValue) => {
  const randomIntArray = [];

  while (randomIntArray.length < length) {
    const randomInt = getRandomInt(minValue, maxValue);
    if (randomIntArray.includes(randomIntArray)) {
      continue;
    } else {
      randomIntArray.push(randomInt);
    }
  }

  return randomIntArray;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, array.length - 1);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if(num > 10 && (Math.round((num % 100) / 10)) === 1){
    return genitivePlural;
  }
  switch(num % 10) {
    case 1: return nominative;
    case 2:
    case 3:
    case 4: return genitiveSingular;
  }

  return genitivePlural;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const stopEscapeOnFocus = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const closeModal = (selector) => {
  document.querySelector(selector).classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const openModal = (selector) => {
  document.querySelector(selector).classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const checkStringLength = (string, maxLength) => string.length > maxLength;

const showErrorAlert = (message) => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('error-message');
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_TIMEOUT);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInt, getRandomIntArray, getRandomArrayElement, shuffleArray, numDecline, isEscapeKey, stopEscapeOnFocus, closeModal, openModal, checkStringLength, showErrorAlert, debounce};
