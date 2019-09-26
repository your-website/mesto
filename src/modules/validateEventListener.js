import {Popup} from './Popup.js';
import buttonNonActive from './buttonNoneActive.js';
import {eve} from './validateFunction.js';
import {popupy} from './newClass.js';
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

