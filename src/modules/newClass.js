import {Popup} from './Popup.js';
import {Api} from './Api.js';
import {BASE_URL, AUTH_KEY} from './CONST_URL_KEY.js';
import {CardList} from './CardList.js';
export {popupy, api, cardlist};
const initialCards = [];

const popupy = new Popup(document.querySelector('.root'));
const api = new Api(BASE_URL, AUTH_KEY);
const cardlist = new CardList(document.querySelector('.places-list'), initialCards);
