// для валидации
export {eve};
import {popupy} from './newClass.js';

let validityEdit = false;
let validityAbout = false;
let validityAvatar = false;
const valueFormEdit = '.popup-edit__error_';

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