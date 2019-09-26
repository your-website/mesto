const initialCards = [];
    
const placesContainer = document.querySelector('.places-list');

// avatar
const popupAvatar = document.querySelector('.popup-avatar');

// Переменные popup добавления карточки
const popup = document.querySelector('.popup');
const form = document.forms.new;

// Переменные для popup-edit
const popupEdit = document.querySelector('.popup-edit');
const formEdit = document.forms.edit;
// переменные для имени и работы user
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');

// переменные для галлереи
const popupPicture = document.querySelector('.popup-picture');
const popupPictureImage = document.querySelector('.popup-picture__image');

const BASE_URL = 'http://95.216.175.5/cohort2/';
const AUTH_KEY = 'd5a43806-1a31-432d-a441-75ca00a6201b';

class Card {
    constructor(name, link, likes, id, ownerId) {
        this.cardElements = this.create(name, link, likes, id, ownerId);
        
        this.cardElements
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);

        this.cardElements
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove);
    }

    like(event) {
        const elt = event.target.closest(".place-card");

        const d =  event.target;
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            api.deleteLikeApi(elt)
                .then(() => d.classList.toggle('place-card__like-icon_liked'))
                .then(() => {
                    let d = elt.querySelector('.place-card__count-like').textContent
                    elt.querySelector('.place-card__count-like').textContent = +d - 1;
                })
                .catch((err) => `Ошибка в deleteLikeApi ${err}`);
        } else {
            api.addLikeApi(elt)
                .then(() => d.classList.toggle('place-card__like-icon_liked'))
                .then(() => {
                    let d = elt.querySelector('.place-card__count-like').textContent
                    elt.querySelector('.place-card__count-like').textContent = +d + 1;
                })
                .catch((err) => `Ошибка в addLikeApi ${err}`);
        }
    }

    remove(event) {
        const elt = event.target.closest(".place-card");
        api.removeApi(elt.id)
            .then(() => placesContainer.removeChild(elt))
            .catch((err) => console.log('ошибка в removeApi' + err));
    }
    
    create(nameValue, linkValue, likesValue, id, ownerId) {
        const placeContainer = document.createElement('div');
        placeContainer.classList.add('place-card');
        placeContainer.id = `${id}`;
        if (likesValue === undefined) {
            likesValue = 0;
        }
        const innerOne = document.createElement('div');
        innerOne.classList.add('place-card__image');
        innerOne.style = `background-image: url(${linkValue})`;
        
        const innerOneOne = document.createElement('button');
        innerOneOne.classList.add('place-card__delete-icon');
        if (ownerId) {
            innerOneOne.style.display = "block";
        }
        
        const innerTwo = document.createElement('div');
        innerTwo.classList.add('place-card__description');
        
        const innerTwoOne = document.createElement('h3');
        innerTwoOne.classList.add('place-card__name');
        innerTwoOne.textContent = `${nameValue}`;
        
        const innerTwoDiv = document.createElement('div');
        innerTwoDiv.classList.add('place-card__container');

        const innerTwoTwo = document.createElement('button');
        innerTwoTwo.classList.add('place-card__like-icon');

        const innerTwoThree = document.createElement('h4');
        innerTwoThree.classList.add('place-card__count-like');
        innerTwoThree.textContent = `${likesValue}`;

        innerTwoDiv.appendChild(innerTwoTwo)
        innerTwoDiv.appendChild(innerTwoThree)
        
        innerOne.appendChild(innerOneOne);
        innerTwo.appendChild(innerTwoOne);
        innerTwo.appendChild(innerTwoDiv);
        
        placeContainer.appendChild(innerOne);
        placeContainer.appendChild(innerTwo);
        
        return placeContainer;
    }
}

class CardList {
    constructor(container, initialCards) {
        this.container = container;
        this.initialCards = initialCards;
        this.render();
    }

    addCard(name, link, likes, id, ownerId) {
        const { cardElements } = new Card(name, link, likes, id, ownerId);
        this.initialCards.push(cardElements);
        this.container.appendChild(cardElements);
    }

    render() {
       const d = new Api(BASE_URL, AUTH_KEY);
       let ownerId;     
       d.getUserInfo()
           .then((result) => {
               ownerId = result._id;
               return d.getInitialCards();
           })
           .then((result) => {
               result.forEach((item) => {
                   if (ownerId === item.owner._id) {
                       this.addCard(item.name, item.link, item.likes.length, item._id, ownerId);
                   } else this.addCard(item.name, item.link, item.likes.length, item._id);
               });
               result.forEach((item) => item.likes.forEach((like) => like._id === ownerId ? document.getElementById(`${item._id}`).querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked') : console.log("net")));
           })
           .catch((err) => console.log('ошибка в getUserInfo ' + err));
    }
}

class Popup {
    constructor(container) {
        this.container = container;

        // событя для добавления карточки
        this.container
            .querySelector('.user-info__button')
            .addEventListener('click', this.open);

        this.container
            .querySelector('.popup__close')
            .addEventListener('click', this.close);

        // события для user
        this.container
            .querySelector('.user-info__edit')
            .addEventListener('click', this.add);

        this.container
            .querySelector('.popup-edit__close')
            .addEventListener('click', this.editClose);

        // события для изображения
        this.container
            .querySelector('.popup-picture__close')
            .addEventListener('click', this.galleryOpenClose);

        // события для avatar

        this.container
            .querySelector('.user-info__photo')
            .addEventListener('click', this.openAvatar);

        this.container
            .querySelector('.popup-avatar__close')
            .addEventListener('click', this.closeAvatar);
    }

    open() {
        popup.classList.add('popup_is-opened');
        document.querySelector('.popup__error_link').textContent = '';
        if (!renderLoadingCard(false, document.forms.new.elements.submit)) {
            renderLoadingCard(true, document.forms.new.elements.submit);
        }
        form.reset();
    }

    openAvatar() {
        popupAvatar.classList.add('popup-avatar_is-opened');
        document.querySelector('.popup-avatar__error_link').textContent = '';
        document.forms.avatar.elements.submit.textContent = "Сохранить";
        document.forms.avatar.reset();
        buttonNonActive(document.forms.avatar.elements.submit);
    }

    close() {
        popup.classList.remove('popup_is-opened');
    }

    closeAvatar() {
        popupAvatar.classList.remove('popup-avatar_is-opened');
        document.forms.avatar.reset();
    }

    // метод добавляет данные в user-info
    add() {

        const name = formEdit.elements.edit;
        const userName = userInfoName.textContent;
        const job = formEdit.elements.about;
        const userJob = userInfoJob.textContent;
    
        name.setAttribute('value', `${userName}`);
        job.setAttribute('value', `${userJob}`);

        popupEdit.classList.toggle('popup-edit_is-opened');

        if (!renderLoading(false, document.forms.edit.elements.submit)) {
            renderLoading(true, document.forms.edit.elements.submit);
        }
    }

    editClose() {
        popupEdit.classList.remove('popup-edit_is-opened');
    }

    galleryOpenClose() {
        popupPicture.classList.toggle('popup-picture_is-opened');
    }

    // метод добавляет ссылку на изображение в popup-picture
    galleryAdd(event) {
        const d = event.target.style.backgroundImage;
        const final = d.substr(5, d.length-7);
        popupPictureImage.setAttribute('src', final);
    }

    validateFieldsText(element, value) {
        const errorElement = document.querySelector(value + `${element.name}`)
        const d = value.substr(0, value.indexOf('_') + 2) + 'button';
        const final = document.querySelector(d);
        

        if (element.validity.valueMissing) {
            errorElement.textContent = 'Это обязательное поле';
            buttonNonActive(final);
            return false;
        } else if (!element.checkValidity()) {
            errorElement.textContent = 'Должно быть от 2 до 30 символов';
            buttonNonActive(final);
            return false;
        } else {
            errorElement.textContent = '';
            return true
        }
    }

    validateFieldsLink(element, value, link) {
        const errorElement = document.querySelector(value + `${element.name}`)
        if (link.value.search(/^https:\/\//) !== 0) {
            errorElement.textContent = 'Здесь должна быть ссылка';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        } 
    }

    validateAdd(value) {
        const d = value.substr(0, value.indexOf('_') + 2) + 'button';
        const final = document.querySelector(d);
        final.removeAttribute('disabled');
        final.style.color = "#fff";
        final.style.backgroundColor = "#000"
    }
}

class Api {
    constructor(baseUrl, authKey) {
        this.baseUrl = baseUrl;
        this.authKey = authKey;
    }

    getInitialCards() {
        const url = this.baseUrl + 'cards'
        const key = this.authKey;
        return fetch(url, {
            headers: {
                authorization: key
            }
        })

        /*
            Можно лучше: т.к. код проверки ответа сервера дублируется во всех методах,
            можно вынести его в отдельный метод:

            getResponseData(res) {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            }
        */

        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
       
    }

    getUserInfo() {
        const url = this.baseUrl + 'users/me';
        const key = this.authKey;
        return fetch(url, {
            method: 'GET',
            headers: {
                authorization: key
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addCardApi(name, link) {
        const url = this.baseUrl + 'cards'
        const key = this.authKey;

        return fetch(url, {
            method: 'POST',
            headers: {
                authorization: key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });

    }
    
    removeApi(item) {
        const url = this.baseUrl + 'cards/' + item;
        const key = this.authKey;

        if (window.confirm("Do you really want to delete it?")) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }
    }

    addDataUserApi(name, about) {
        const url = this.baseUrl + 'users/me';
        const key = this.authKey;

        return fetch(url, {
            method: 'PATCH',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addAvatarApi(link) {
        const url = this.baseUrl + 'users/me/avatar';
        const key = this.authKey;

        return fetch(url, {
            method: 'PATCH',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: link.value
                })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLikeApi(elt) {
        const url = this.baseUrl + 'cards/like/' + elt.id;
        const key = this.authKey;

        return fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    addLikeApi(elt) {
        const url = this.baseUrl + 'cards/like/' + elt.id;
        const key = this.authKey;

        return fetch(url, {
                method: 'PUT',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}

const cardlist = new CardList(document.querySelector('.places-list'), initialCards);
const popupy = new Popup(document.querySelector('.root'));
const api = new Api(BASE_URL, AUTH_KEY);

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранить"
    } else {
        button.textContent = "Загрузка"
    }
}

function renderLoadingCard(isLoading, button) {
    if (isLoading) {
        button.textContent = "+"
        button.style.fontSize = "36px";

    } else {
        button.textContent = "Загрузка"
        button.style.fontSize = "18px";
    }
}

// для валидации
function eve(event) {
    popupy.validateFieldsText(event.target, valueFormEdit);
    validityAbout = popupy.validateFieldsText(event.target, valueFormEdit);
    if (validityEdit && validityAbout) {
        popupy.validateAdd(valueFormEdit);
    }

    popupy.validateFieldsText(event.target, valueFormEdit);
    validityEdit = popupy.validateFieldsText(event.target, valueFormEdit);
    if (validityEdit && validityAbout) {
        popupy.validateAdd(valueFormEdit);
    }
}


function buttonNonActive(final) {
    final.setAttribute('disabled', true);
    final.style.color = "rgba(0, 0, 0, .2)";
    final.style.backgroundColor = "#fff"
}

// получение данных user
api.getUserInfo()
    .then((res) => {
        const avatar = document.querySelector('.user-info__photo');
        const userInfo = document.querySelector('.user-info__name');
        const about = document.querySelector('.user-info__job');

        avatar.style.backgroundImage = 'url(' + res.avatar + ')';
        userInfo.textContent = res.name;
        about.textContent = res.about;
    })
    .catch((err) => console.log('ошибка в getUserInfo' + err));

// добавление карточки
document.forms.new.addEventListener('submit', function (event) {
    event.preventDefault();
    renderLoadingCard(true, document.forms.new.elements.submit);
    let ownerId;

    api.getUserInfo()
        .then((res) => {
            ownerId = res._id;
            return api.addCardApi(form.elements.name.value, form.elements.link.value);
        })
        .then((res) => cardlist.addCard(form.elements.name.value, form.elements.link.value, res.likes.length, res._id, ownerId))
        .then(() => {
            setTimeout(popupy.close, 500);
        })
        .catch((err) => console.log('ошибка в addCardApi' + err))
        .finally(() => renderLoadingCard(false, document.forms.new.elements.submit));
});

// открытие изображения на котором был клик
placesContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('place-card__image')) {
        popupy.galleryAdd(event);
        popupy.galleryOpenClose();
    };
});

// добавление данных в user
formEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    renderLoading(true, formEdit.elements.submit);
    const name = formEdit.elements.edit;
    const job = formEdit.elements.about;

    api.addDataUserApi(name.value, job.value)
        .then(() => {
            userInfoJob.textContent = job.value;
            userInfoName.textContent = name.value;
        })
        .then(() => {
            setTimeout(popupy.editClose, 500);
        })
        .catch((err) => `Ошибка в addDataUserApi ${err}`)
        .finally(() => renderLoading(false, formEdit.elements.submit));
});

// добавление аватара
document.forms.avatar.addEventListener('submit', function (event) {
    event.preventDefault();
    api.addAvatarApi(document.forms.avatar.elements.link)
        .then(() => {
            setTimeout(popupy.closeAvatar, 500);
        })
        .catch((err) => `Ошибка в addAvatarApi ${err}`)
        .finally(() => renderLoading(false, document.forms.avatar.elements.submit));

    document.querySelector('.user-info__photo').style.backgroundImage = "url(\"" + document.forms.avatar.elements.link.value + "\")";
});

// валидация формы
const valueFormEdit = '.popup-edit__error_';
const valueFormNew = '.popup__error_';
const valueFormAvatar = '.popup-avatar__error_';

const edtitName = document.querySelector('.popup-edit__input_type_name');
const edtitLink = document.querySelector('.popup-edit__input_type_link-url');
const popupName = document.querySelector('.popup__input_type_name');
const popupLink = document.querySelector('.popup__input_type_link-url');
const popupAvatarLink = document.querySelector('.popup-avatar__input_type_link-url');

let validityName = false;
let validityLink = false;
let validityEdit = false;
let validityAbout = false;
let validityAvatar = false;

// валидация popup
popupLink.addEventListener('input', function (event) {
    popupy.validateFieldsLink(event.target, valueFormNew, popupLink);
    validityLink = popupy.validateFieldsLink(event.target, valueFormNew, popupLink);

    if (validityLink && validityName) {
        popupy.validateAdd(valueFormNew);
    } else buttonNonActive(document.forms.new.elements.submit);
});

popupName.addEventListener('input', function (event) {
    popupy.validateFieldsText(event.target, valueFormNew);
    validityName = popupy.validateFieldsText(event.target, valueFormNew);

    if (validityLink && validityName) {
        popupy.validateAdd(valueFormNew);
    } else buttonNonActive(document.forms.new.elements.submit);
});

// валидация popup-avatar
popupAvatarLink.addEventListener('input', function (event) {
    popupy.validateFieldsLink(event.target, valueFormAvatar, popupAvatarLink);
    validityLink = popupy.validateFieldsLink(event.target, valueFormAvatar, popupAvatarLink);

    if (validityLink) {
        popupy.validateAdd(valueFormAvatar);
    } else buttonNonActive(document.forms.avatar.elements.submit);
});

// валидация popup-edit
edtitName.addEventListener('input', function (event) {
    eve(event);
});


edtitLink.addEventListener('input', function (event) {
    eve(event);
});


/*
    Отличная работа! Задание выполнено полность, все исправления внесены, ошибок в 
    при выполнении программы не найдено.

    Для практики можете попробовать переписать код обмена с сервером 
    используя async/await https://learn.javascript.ru/async-await

*/