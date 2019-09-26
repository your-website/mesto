import {api} from './newClass.js';

export {getUserInfo};
// получение данных user
const getUserInfo = api.getUserInfo()
    .then((res) => {
        const avatar = document.querySelector('.user-info__photo');
        const userInfo = document.querySelector('.user-info__name');
        const about = document.querySelector('.user-info__job');

        avatar.style.backgroundImage = 'url(' + res.avatar + ')';
        userInfo.textContent = res.name;
        about.textContent = res.about;
    })
    .catch((err) => console.log('ошибка в getUserInfo' + err));