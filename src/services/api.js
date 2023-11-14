import { getCookie, setCookie } from "../utils/cookies";
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
};

export const forgotPasswordRequest = () => {
    return request(`password-reset`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify( {
            email: "",
        }),
    })
}

export const resetPasswordRequest = () => {
    return request(`password-reset/reset`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify( {
            password: "",
            token: "",
        }),
    })
}

export const getProfileRequest = () => {
    return request(`auth/user`, {
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie("access"),
        }
    })
}

export const sendProfileRequest = (name, email, password) => {
    return request(`auth/user`, {
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie("access"),
        },
        method: 'PATCH',
        body: JSON.stringify( {
            name,
            email,
            password
        }),
    })
}

export const registrationRequest = (user) => {
    const { email, password, name } = user;
    return request(`auth/register`, {
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie("access"),
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    })
}

export const loginRequest = (user) => {
    const { email, password } = user;
    return request(`auth/login`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    })
}

export const logoutRequest = () => {
    return request(`auth/logout`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            token: getCookie("refresh"),
        }),
    })
}


