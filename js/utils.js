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

export {getRandomInt, getRandomIntArray, getRandomArrayElement};
