const getRandomInt = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (1 + max - min)) + min;
};

getRandomInt(1, 2);

const checkStringLength = (string, maxLength) => string.length < maxLength;

checkStringLength('Hello, world!', 15);
