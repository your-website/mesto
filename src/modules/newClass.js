import {Popup} from './Popup.js';
import {Api} from './Api.js';
import {BASE_URL, AUTH_KEY} from './CONST_URL_KEY.js';
import {CardList} from './CardList.js';
export {popupy, api, cardlist};
const serverUrl  = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2/' : 'http://95.216.175.5/cohort2/';

const initialCards = [];

const popupy = new Popup(document.querySelector('.root'));
const api = new Api(serverUrl, AUTH_KEY);
const cardlist = new CardList(document.querySelector('.places-list'), initialCards);
