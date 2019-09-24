import "./style.css";
import {Card} from './modules/Card.js';
import {CardList} from './modules/CardList.js';
import {Api} from './modules/Api.js';
import {Popup} from './modules/Popup.js';
import * as all from "./modules/validateEventListener";
import {renderLoading, renderLoadingCard} from './modules/renderLoading.js';

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

const cardlist = new CardList(document.querySelector('.places-list'), initialCards);
const popupy = new Popup(document.querySelector('.root'));
const api = new Api(BASE_URL, AUTH_KEY);



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




/*
    Отличная работа! Задание выполнено полность, все исправления внесены, ошибок в 
    при выполнении программы не найдено.

    Для практики можете попробовать переписать код обмена с сервером 
    используя async/await https://learn.javascript.ru/async-await

*/