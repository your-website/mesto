export class Api {
    constructor(baseUrl, authKey) {
        this.baseUrl = baseUrl;
        this.authKey = authKey;
    }

    getInitialCards() {
        const url = this.baseUrl + 'cards'
        const key = this.authKey;
        return fetch(url, {
            headers: {
                authorization: key
            }
        })

        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
       
    }

    getUserInfo() {
        const url = this.baseUrl + 'users/me';
        const key = this.authKey;
        return fetch(url, {
            method: 'GET',
            headers: {
                authorization: key
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addCardApi(name, link) {
        const url = this.baseUrl + 'cards'
        const key = this.authKey;

        return fetch(url, {
            method: 'POST',
            headers: {
                authorization: key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });

    }
    
    removeApi(item) {
        const url = this.baseUrl + 'cards/' + item;
        const key = this.authKey;

        if (window.confirm("Do you really want to delete it?")) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }
    }

    addDataUserApi(name, about) {
        const url = this.baseUrl + 'users/me';
        const key = this.authKey;

        return fetch(url, {
            method: 'PATCH',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addAvatarApi(link) {
        const url = this.baseUrl + 'users/me/avatar';
        const key = this.authKey;

        return fetch(url, {
            method: 'PATCH',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: link.value
                })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLikeApi(elt) {
        const url = this.baseUrl + 'cards/like/' + elt.id;
        const key = this.authKey;

        return fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    addLikeApi(elt) {
        const url = this.baseUrl + 'cards/like/' + elt.id;
        const key = this.authKey;

        return fetch(url, {
                method: 'PUT',
                headers: {
                    authorization: key,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}