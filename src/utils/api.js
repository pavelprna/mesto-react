class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(param) {
    return fetch(this._baseUrl + param.path, {
      method: param.method,
      headers: this._headers,
      body: param.body,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.message}`);
      });
  }

  getUser() {
    return this._request({
      method: 'GET',
      path: 'users/me',
    });
  }

  getInitialCards() {
    return this._request({
      method: 'GET',
      path: 'cards',
    });
  }

  updateUser(data) {
    return this._request({
      method: 'PATCH',
      path: 'users/me',
      body: JSON.stringify(data),
    });
  }

  createCard(data) {
    return this._request({
      method: 'POST',
      path: 'cards',
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request({
      method: 'DELETE',
      path: `cards/${cardId}`,
    });
  }

  likeCard(cardId) {
    return this._request({
      method: 'PUT',
      path: `cards/likes/${cardId}`,
    });
  }

  unlikeCard(cardId) {
    return this._request({
      method: 'DELETE',
      path: `cards/likes/${cardId}`,
    });
  }

  changeAvatar(link) {
    return this._request({
      method: 'PATCH',
      path: 'users/me/avatar',
      body: JSON.stringify(link),
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25/',
  headers: {
    authorization: '04f57d96-9414-4d3f-8e70-9d8b878ddf47',
    'Content-Type': 'application/json'
  }
})