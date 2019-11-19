import buttonNonActive from './buttonNoneActive.js';
import {renderLoading, renderLoadingCard} from './renderLoading.js';
export {Popup};

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


