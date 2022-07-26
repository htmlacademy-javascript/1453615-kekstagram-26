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

const toggleModalView = (selector) => {
  document.querySelector(selector).classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
};

const checkStringLength = (string, maxLength) => string.length > maxLength;

export {getRandomInt, getRandomIntArray, getRandomArrayElement, numDecline, isEscapeKey, stopEscapeOnFocus, toggleModalView, checkStringLength};
