
// 1 раз объявляем базовый урл
export const BASE_URL = "https://norma.nomoreparties.space/api/";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ответ не success: ${res}`);
};

function request(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const getIngredientsRequest =  () => request('ingredients');

export const postOrderRequest = (id) => {
    return request(`orders`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify( {
            ingredients: id
        })
    })
}


