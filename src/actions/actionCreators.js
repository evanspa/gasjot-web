import React from "react"
import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import * as actionTypes from "./actionTypes"
import {toastr} from 'react-redux-toastr'
import {actions as toastrActions} from 'react-redux-toastr'

export function initiateLoginRequest() {
    return { type: actionTypes.LOGIN_REQUEST_INITIATED }
}

export function receiveServerSnapshot(serverSnapshot) {
    return { type: actionTypes.SERVER_SNAPSHOT_RECEIVED, serverSnapshot }
}

export function receiveAuthenticationToken(authToken) {
    return { type: actionTypes.AUTH_TOKEN_RECEIVED, authToken }
}

export function receiveUserUri(userUri) {
    return { type: actionTypes.USER_URI_RECEIVED, userUri }
}

export function receiveResponseStatus(responseStatus) {
    return { type: actionTypes.RESPONSE_STATUS_RECEIVED, responseStatus}
}

export function loginRequestFailed(error) {
    return { type: actionTypes.LOGIN_REQUEST_INITIATED, error }
}

export function logoutRequestInitiated() {
    return { type: actionTypes.LOGOUT_REQUEST_INITIATED }
}

export function logoutRequestDone() {
    return { type: actionTypes.LOGOUT_REQUEST_DONE }
}

export function logout(logoutUri, authToken) {
    return (dispatch) => {
        toastr.info('Processing logout...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
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
                dispatch(logoutRequestDone())
                dispatch(push("/loggedOut"))
                toastr.clean()
            })
            .catch(error => {
                // because we're not going to 'gracefully' handle this from a user-perspective...because the user can't
                // really do anything about it, and, because we'll still be deleting from localStorage the authentication
                // token, we're pretty much good
                dispatch(logoutRequestDone())
                dispatch(push("/loggedOut"))
                toastr.clean()
            })
    }
}

export function attemptLogin(usernameOrEmail, password, nextSuccessPathname) {
    return (dispatch) => {
        toastr.info('Logging you in...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(initiateLoginRequest())
        const headers = new Headers()
        headers.append("Content-Type", "application/vnd.fp.user-v0.0.1+json;charset=UTF-8")
        headers.append("Accept-Language", "en-US")
        headers.append("Accept", "application/vnd.fp.user-v0.0.1+json")
        headers.append("fp-desired-embedded-format", "id-keyed")
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
                dispatch(toastrActions.clean())
                toastr.success("Welcome Back", "You are now logged in.", { icon: "icon-check-1", timeOut: 4000 })
            })
            .catch(error => {
                toastr.clean()
                dispatch(loginRequestFailed(error))
            })
    }
}




