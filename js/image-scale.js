const ImageScaleSetting = {
  INITIAL: 100,
  MIN: 25,
  MAX: 150,
  STEP: 25
};

const imageScallerElement = document.querySelector('.img-upload__scale');
const imageScallerOutputElement = imageScallerElement.querySelector('.scale__control--value');
imageScallerOutputElement.value = ImageScaleSetting.INITIAL;

const getScalleDirection = (isUp) => {
  const scaleCoefficient = isUp ? 1 : -1;

  const changeUploadScallerValue = (currentValue) => {
    const changedValue = currentValue + ImageScaleSetting.STEP * scaleCoefficient;

    if (changedValue > ImageScaleSetting.MAX || changedValue < ImageScaleSetting.MIN) {
      return currentValue;
    }

    return changedValue;
  };

  return changeUploadScallerValue;
};

const changeScaleUp = getScalleDirection(false);
const changeScaleDown = getScalleDirection(true);

const onImageScallerClick = (evt) => {
  const scalleUpButton = evt.target.closest('.scale__control--smaller');
  const scalleDownButton = evt.target.closest('.scale__control--bigger');
  let currentScaleValue = +imageScallerOutputElement.value;

  if (scalleUpButton) {
    currentScaleValue = changeScaleUp(currentScaleValue);
  }

  if (scalleDownButton) {
    currentScaleValue = changeScaleDown(currentScaleValue);
  }

  imageScallerOutputElement.value = currentScaleValue;
};

export {onImageScallerClick};
