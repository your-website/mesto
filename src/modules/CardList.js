import {Card} from './Card.js';
import {BASE_URL, AUTH_KEY} from './CONST_URL_KEY.js';
import {Api} from './Api.js';
import {popupy} from './newClass.js';
export class CardList {
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
               result.forEach((item) => item.likes.forEach((like) => like._id === ownerId ? document.getElementById(`${item._id}`).querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked') : console.log('')));
           })
           .catch((err) => console.log('ошибка в getUserInfo ' + err));
    }
}