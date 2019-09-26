import {Popup} from './Popup.js';
import {Api} from './Api.js';
import {AUTH_KEY} from './CONST_URL_KEY.js';
import {CardList} from './CardList.js';
export {popupy, api, cardlist};
const serverUrl  = NODE_ENV === 'development' ? 'https://praktikum.tk/cohort2/' : 'https://praktikum.tk/cohort2/';

const initialCards = [];

const popupy = new Popup(document.querySelector('.root'));
const api = new Api(serverUrl, AUTH_KEY);
const cardlist = new CardList(document.querySelector('.places-list'), initialCards);
