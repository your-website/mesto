import {renderLoading, renderLoadingCard} from './renderLoading.js';
import {api, popupy} from './newClass.js';
export {addUserDate};

const formEdit = document.forms.edit;
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
// добавление данных в user
const addUserDate = formEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    renderLoading(true, formEdit.elements.submit);
    const name = formEdit.elements.edit;
    const job = formEdit.elements.about;

    api.addDataUserApi(name.value, job.value)
        .then(() => {
            userInfoJob.textContent = job.value;
            userInfoName.textContent = name.value;
        })
        .then(() => {
            setTimeout(popupy.editClose, 500);
        })
        .catch((err) => `Ошибка в addDataUserApi ${err}`)
        .finally(() => renderLoading(false, formEdit.elements.submit));
});