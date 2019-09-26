import {api, cardlist, popupy} from './newClass.js';

export {d};

const placesContainer = document.querySelector('.places-list');
// открытие изображения на котором был клик
const d = placesContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('place-card__image')) {
        popupy.galleryAdd(event);
        popupy.galleryOpenClose();
    };
});
