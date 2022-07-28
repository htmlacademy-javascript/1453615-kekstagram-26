const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadInputElement = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

imageUploadInputElement.addEventListener('change', () => {
  const file = imageUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreviewElement.src = URL.createObjectURL(file);
  }
});

export {imageUploadInputElement};
