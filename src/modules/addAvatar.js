
import {api, popupy} from './newClass.js';
import {renderLoading, renderLoadingCard} from './renderLoading.js';

export {addAvatar};
// добавление аватара
const addAvatar = document.forms.avatar.addEventListener('submit', function (event) {
    event.preventDefault();
    api.addAvatarApi(document.forms.avatar.elements.link)
        .then(() => {
            setTimeout(popupy.closeAvatar, 500);
        })
        .catch((err) => `Ошибка в addAvatarApi ${err}`)
        .finally(() => renderLoading(false, document.forms.avatar.elements.submit));

    document.querySelector('.user-info__photo').style.backgroundImage = "url(\"" + document.forms.avatar.elements.link.value + "\")";
});