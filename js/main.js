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

const DESCRIPTION_ID = {
  min: 1,
  max: 25
};

// const PHOTOS_URL_ID = {
//   min: 1,
//   max: 25
// };

const PHOTOS_DESCRIPTIONS = ['Рассвет в горах.', 'На берегу моря.', 'Сфоткал свой завтрак.', 'Ужин при свечах.', 'Без кота - жизнь не та.', 'Поработал - отдохни.', 'Люблю JavaScript!', 'На планёрке.', 'Отпуск.', 'Домик в деревне.', 'Новое платье.', 'Пошопились'];

const LIKES_COUNT = {
  min: 15,
  max: 200
};

const COMMENT_ID = {
  min: 1,
  max: 500
};

const AVERAGE_COMMENTS_COUNT = 5;

const COMMENT_MESSAGES_COUNT = {
  min: 1,
  max: 2
};

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_AVATAR_ID = {
  min: 1,
  max: 6
};

const COMMENT_NAMES = ['Егор', 'Дмитрий', 'Амина', 'Иван', 'Татьяна', 'Роберт', 'Александр', 'Руслан', 'Михаил', 'Александра', 'Али', 'Виктория', 'Злата', 'Денис', 'Николай', 'Елизавета', 'Максим', 'Елена', 'Милана', 'Артём', 'Никита', 'Анастасия', 'София', 'Эмма', 'Лев', 'Антон', 'Варвара', 'Роман', 'Мария', 'Владимир', 'Григорий', 'Аделина', 'Софья', 'Вера', 'Маргарита', 'Ксения', 'Дарина', 'Дарья', 'Даниил', 'Анна'];

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

const getCommentMessage = (messagesArray, countMin, countMax) => {
  const messages = [];

  while (messages.length < getRandomInt(countMin, countMax)) {
    const comment = getRandomArrayElement(messagesArray);

    if (messages.includes(comment)) {
      continue;
    }

    messages.push(comment);
  }

  return messages.join(' ');
};

const getAllComments = () => {
  const commentIds = getRandomIntArray(DESCRIPTION_ID.max * AVERAGE_COMMENTS_COUNT, COMMENT_ID.min, COMMENT_ID.max);

  return commentIds.map((id) => new Object({
    id: id,
    descriptionId: getRandomInt(DESCRIPTION_ID.min, DESCRIPTION_ID.max),
    avatar: `'img/avatar-${getRandomInt(COMMENT_AVATAR_ID.min, COMMENT_AVATAR_ID.max)}.svg'`,
    message: getCommentMessage(COMMENT_MESSAGES, COMMENT_MESSAGES_COUNT.min, COMMENT_MESSAGES_COUNT.max),
    name: getRandomArrayElement(COMMENT_NAMES)
  }));
};

const getDescriptions = () => {
  const descriptions = [];
  for (let i = DESCRIPTION_ID.min; i <= DESCRIPTION_ID.max; i++) {
    descriptions.push(new Object({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(PHOTOS_DESCRIPTIONS),
      likes: getRandomInt(LIKES_COUNT.min, LIKES_COUNT.max),
      comments: getAllComments()
        .filter((item) => item.descriptionId === i)
        .map((item) => {
          delete item.descriptionId;
          return item;
        })
    }));
  }

  return descriptions;
};

getDescriptions();
