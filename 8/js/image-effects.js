const Effects = [
  {
    NAME: 'none',
    SETTINGS: {}
  },
  {
    NAME: 'chrome',
    SETTINGS: {
      FILTER: 'grayscale',
      MIN: 0,
      MAX: 1,
      STEP: 0.1,
      UNIT: ''
    }
  },
  {
    NAME: 'sepia',
    SETTINGS: {
      FILTER: 'sepia',
      MIN: 0,
      MAX: 1,
      STEP: 0.1,
      UNIT: ''
    }
  },
  {
    NAME: 'marvin',
    SETTINGS: {
      FILTER: 'invert',
      MIN: 0,
      MAX: 100,
      STEP: 1,
      UNIT: '%'
    }
  },
  {
    NAME: 'phobos',
    SETTINGS: {
      FILTER: 'blur',
      MIN: 0,
      MAX: 3,
      STEP: 0.1,
      UNIT: 'px'
    }
  },
  {
    NAME: 'heat',
    SETTINGS: {
      FILTER: 'brightness',
      MIN: 1,
      MAX: 3,
      STEP: 0.1,
      UNIT: ''
    }
  }
];

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageEffectsElement = document.querySelector('.img-upload__effects');
const imageEfectLevelElement = document.querySelector('.effect-level__value');
const imageEffectLevelSliderElement = document.querySelector('.img-upload__effect-level');

const getEffect = (effect) => {
  const {FILTER, MAX, UNIT} = effect.SETTINGS;
  return `filter: ${FILTER}(${MAX}${UNIT})`;
};

const getEffectClass = (NAME) => `effects__preview--${NAME}`;

const setEffectClass = function ({NAME}) {
  if (NAME === 'none') {
    this.removeAttribute('class');
  } else {
    this.className = getEffectClass(NAME);
  }
};

const onImageUploadEffectChange = (evt) => {
  Effects.map((effect) => {
    if (effect.NAME === evt.target.value) {
      setEffectClass.call(imagePreviewElement, effect);
      imageEfectLevelElement.value = effect.SETTINGS.MAX;
    }

    if (evt.target.value === 'none') {
      imageEffectLevelSliderElement.classList.toggle('hidden');
      imageEfectLevelElement.value = -1;
    } else if (imageEffectLevelSliderElement.classList.contains('hidden')) {
      imageEffectLevelSliderElement.classList.remove('hidden');
    }
  });
};

imageEffectsElement.addEventListener('change', onImageUploadEffectChange);

export {getEffect, onImageUploadEffectChange};
