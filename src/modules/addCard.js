
import {renderLoading, renderLoadingCard} from './renderLoading.js';
import {api, cardlist, popupy} from './newClass.js';
export {d};

const form = document.forms.new;
const d = document.forms.new.addEventListener('submit', function (event) {
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