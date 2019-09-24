import {Api} from './Api.js';
import {BASE_URL, AUTH_KEY} from './CONST_URL_KEY.js';

const placesContainer = document.querySelector('.places-list');
const api = new Api(BASE_URL, AUTH_KEY);

export class Card {
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
