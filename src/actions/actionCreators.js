import { LOGIN_REQUEST_INITIATED } from "./actionTypes"
import { LOGIN_REQUEST_FAILED } from "./actionTypes"
import { LOGOUT_REQUEST_INITIATED } from "./actionTypes"
import { LOGOUT_REQUEST_SUCCESSFUL } from "./actionTypes"
import { LOGOUT_REQUEST_FAILED } from "./actionTypes"
import { SERVER_SNAPSHOT_RECEIVED } from "./actionTypes"
import { AUTH_TOKEN_RECEIVED } from "./actionTypes"
import { USER_URI_RECEIVED } from "./actionTypes"
import { RESPONSE_STATUS_RECEIVED } from "./actionTypes"
import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

export function initiateLoginRequest() {
    return { type: LOGIN_REQUEST_INITIATED }
}

export function receiveServerSnapshot(serverSnapshot) {
    return { type: SERVER_SNAPSHOT_RECEIVED, serverSnapshot }
}

export function receiveAuthenticationToken(authToken) {
    return { type: AUTH_TOKEN_RECEIVED, authToken }
}

export function receiveUserUri(userUri) {
    return { type: USER_URI_RECEIVED, userUri }
}

export function receiveResponseStatus(responseStatus) {
    return { type: RESPONSE_STATUS_RECEIVED, responseStatus}
}

export function loginRequestFailed(error) {
    return { type: LOGIN_REQUEST_INITIATED, error }
}

export function initiateLogoutRequest() {
    return { type: LOGOUT_REQUEST_INITIATED }
}

export function logoutRequestSuccessful() {
    return { type: LOGOUT_REQUEST_SUCCESSFUL }
}

export function logout(logoutUri, authToken) {
    return (dispatch) => {
        dispatch(initiateLogoutRequest())
        const headers = new Headers()
        headers.append("Accept-Language", "en-US")
        headers.append("Accept", "application/vnd.fp.user-v0.0.1+json")
        headers.append("Content-Type", "application/vnd.fp.user-v0.0.1+json;charset=UTF-8")
        headers.append("Authorization", "fp-auth fp-token=\"" + authToken + "\"")
        const init = {
            method: "POST",
            headers,
            body: JSON.stringify({})
        }
        return fetch(logoutUri, init)
            .then(response => {
                dispatch(logoutRequestSuccessful())
                dispatch(push("/logout"))
            })
    }
}

export function attemptLogin(usernameOrEmail, password, nextSuccessPathname) {
    return (dispatch) => {
        dispatch(initiateLoginRequest())
        const headers = new Headers()
        headers.append("Content-Type", "application/vnd.fp.user-v0.0.1+json;charset=UTF-8")
        headers.append("Accept-Language", "en-US")
        headers.append("Accept", "application/vnd.fp.user-v0.0.1+json")
        const requestPayload = {
            "user/username-or-email": usernameOrEmail,
            "user/password": password
        };
        const init = {
            method: "POST",
            headers,
            body: JSON.stringify(requestPayload)
        }
        return fetch("http://www.jotyourself.com/gasjot/d/login", init)
            .then(response => {
                dispatch(receiveAuthenticationToken(response.headers.get("fp-auth-token")))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(receiveResponseStatus(response.status))
                return response.json()
            })
            .then(json => {
                dispatch(receiveServerSnapshot(json))
                dispatch(push(nextSuccessPathname))
            })
            .catch(error => {
                dispatch(loginRequestFailed(error))
            })
    }
}




