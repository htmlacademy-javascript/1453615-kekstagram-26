const Urls = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram'
};

const DOWNLOAD_ERROR_MESSAGE = 'Не удалось загружить изображения =(';

const getData = (onSuccess, onError) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    })
    .catch(() => {
      onError(DOWNLOAD_ERROR_MESSAGE);
    });
};

const createRequest = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

export {createRequest, getData};
