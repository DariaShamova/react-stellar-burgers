import {checkResponse} from "../utils/utils";

const settings = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}
function request(url, options) {
    return fetch(`${settings.baseUrl}/${url}`, options)
        .then(checkResponse)
}
export const getIngredientsRequest = () => {
    return request(`ingredients`, {
        headers: settings.headers
    })
}
export const postOrderRequest = (id) => {
    return request(`orders`, {
        headers: settings.headers,
        method: 'POST',
        body: JSON.stringify( {
            ingredients: id
        })
    })
}


