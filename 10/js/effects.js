const INITIAL_EFFECT = 'none';

const Effects = {
  'none': {
    settings: {
      range: {
        min: 1,
        max: 100,
      },
      step: 1,
      start: 100,
      filter: '',
      unit: ''
    }
  },
  'chrome': {
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1,
      filter: 'grayscale',
      unit: ''
    }
  },
  'sepia': {
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1,
      filter: 'sepia',
      unit: ''
    }
  },
  'marvin': {
    settings: {
      range: {
        min: 0,
        max: 100
      },
      step: 1,
      start: 100,
      filter: 'invert',
      unit: '%'
    }
  },
  'phobos': {
    settings: {
      range: {
        min: 0,
        max: 3
      },
      step: 0.1,
      start: 3,
      filter: 'blur',
      unit: 'px'
    }
  },
  'heat': {
    settings: {
      range: {
        min: 1,
        max: 3
      },
      step: 0.1,
      start: 3,
      filter: 'brightness',
      unit: ''
    }
  }
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageEffectControl = document.querySelector('.img-upload__effect-level');
const imageEfectSliderElement = document.querySelector('.effect-level__slider');
const imageEfectLevelValue = document.querySelector('.effect-level__value');

imageEffectControl.classList.add('hidden');

noUiSlider.create(imageEfectSliderElement, {
  range: {
    min: 1,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setEffect = (name) => {
  const {filter, unit} = Effects[name].settings;

  if (!imageEffectControl.classList.contains('hidden') && name === 'none') {
    imageEffectControl.classList.add('hidden');
  } else {
    imageEffectControl.classList.remove('hidden');
  }

  imageEfectSliderElement.noUiSlider.updateOptions(Effects[name].settings);

  imageEfectSliderElement.noUiSlider.on('update', () => {
    imageEfectLevelValue.value = imageEfectSliderElement.noUiSlider.get();
    imagePreviewElement.style.filter = name === INITIAL_EFFECT ? `${filter}` : `${filter}(${imageEfectLevelValue.value}${unit})`;
  });
};

const setEffectClass = (name) => {
  if (name === 'none') {
    imagePreviewElement.removeAttribute('class');
  } else {
    imagePreviewElement.className = `effects__preview--${name}`;
  }
};

const onImageUploadEffectChange = (evt) => {
  const targetEffectName = evt.target.value;

  setEffectClass(targetEffectName);
  setEffect(targetEffectName);
};

export {onImageUploadEffectChange, setEffect};
