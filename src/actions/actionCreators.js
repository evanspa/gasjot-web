import React from "react"
import { push, goBack } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import * as actionTypes from "./actionTypes"
import {toastr} from 'react-redux-toastr'
import {actions as toastrActions} from 'react-redux-toastr'

const LOGIN_URI = "http://www.jotyourself.com/gasjot/d/login"
const FP_AUTH_TOKEN_HEADER = "fp-auth-token"

export function initiateLoginRequest() {
    return { type: actionTypes.LOGIN_REQUEST_INITIATED }
}

export function receiveServerSnapshot(serverSnapshot) {
    return { type: actionTypes.SERVER_SNAPSHOT_RECEIVED, serverSnapshot }
}

export function receiveServerVehicle(serverVehicle) {
    return { type: actionTypes.SERVER_VEHICLE_RECEIVED, serverVehicle }
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

export function markVehicleForEdit(vehicleId) {
    return { type: actionTypes.MARK_VEHICLE_FOR_EDIT, vehicleId }
}

export function apiRequestInitiated() {
    return { type: actionTypes.API_REQUEST_INITIATED }
}

export function apiRequestDone() {
    return { type: actionTypes.API_REQUEST_DONE }
}

const makeMediaType = entityName => "application/vnd.fp." + entityName + "-v0.0.1+json"
const makeContentType = (mediaType, charset) => mediaType + ";charset=" + charset

const charset = "UTF-8"

const userMediaType = makeMediaType("user")
const userContentType = makeContentType(userMediaType, charset)

const vehicleMediaType = makeMediaType("vehicle")
const vehicleContentType = makeContentType(vehicleMediaType, charset)

const appendCommonHeaders = (headers, mediaType) => {
    headers.append("Accept-Language", "en-US")
    headers.append("Accept", mediaType)
}

const appendAuthenticatedCommonHeaders = (headers, mediaType, authToken) => {
    appendCommonHeaders(headers, mediaType)
    headers.append("Authorization", "fp-auth fp-token=\"" + authToken + "\"")
}

const appendContentType = (headers, contentType) => {
    headers.append("Content-Type", contentType)
}

const initForFetch = (headers, payload, method) => ({
    method: method,
    headers,
    body: JSON.stringify(payload)
})

const postInitForFetch = (headers, payload) => initForFetch(headers, payload, "POST")
const putInitForFetch = (headers, payload) => initForFetch(headers, payload, "PUT")

export function logout(logoutUri, authToken) {
    return (dispatch) => {
        toastr.info('Processing logout...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const headers = new Headers()
        appendContentType(headers, userContentType)
        appendAuthenticatedCommonHeaders(headers, userMediaType, authToken)
        return fetch(logoutUri, postInitForFetch(headers, {}))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(logoutRequestDone())
                dispatch(push("/loggedOut"))
                toastr.clean()
            })
            .catch(error => {
                // because we're not going to 'gracefully' handle this from a user-perspective...because the user can't
                // really do anything about it, and, because we'll still be deleting from localStorage the authentication
                // token, we're pretty much good
                dispatch(apiRequestDone())
                dispatch(logoutRequestDone())
                dispatch(push("/loggedOut"))
                toastr.clean()
            })
    }
}

export function attemptLogin(nextSuccessPathname) {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Logging you in...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        dispatch(initiateLoginRequest())
        const headers = new Headers()
        appendContentType(headers, userContentType)
        appendCommonHeaders(headers, userMediaType)
        headers.append("fp-desired-embedded-format", "id-keyed")
        const requestPayload = {
            "user/username-or-email": state.form.login.usernameOrEmail.value,
            "user/password": state.form.login.password.value
        };
        return fetch(LOGIN_URI, postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveAuthenticationToken(response.headers.get(FP_AUTH_TOKEN_HEADER)))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(receiveResponseStatus(response.status))
                return response.json()
            })
            .then(json => {
                dispatch(receiveServerSnapshot(json))
                dispatch(push(nextSuccessPathname))
                dispatch(toastrActions.clean())
                toastr.success("Welcome Back", "You are now logged in.", { icon: "icon-check-1", timeOut: 3000 })
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
                dispatch(loginRequestFailed(error))
            })
    }
}

const populateIfNotNull = (form, formKey, target, targetKey, transformer = null) => {
    if (form[formKey].value != null) {
        if (form[formKey].touched) {
            if (transformer != null) {
                target[targetKey] = transformer(form[formKey].value)
            } else {
                target[targetKey] = form[formKey].value
            }
        }
    }
}

const vehicleRequestPayload = form => {
    var payload = {}
    populateIfNotNull(form, "name",                  payload, "fpvehicle/name");
    populateIfNotNull(form, "plate",                 payload, "fpvehicle/plate");
    populateIfNotNull(form, "vin",                   payload, "fpvehicle/vin");
    populateIfNotNull(form, "fuelCapacity",          payload, "fpvehicle/fuel-capacity", _.toNumber);
    populateIfNotNull(form, "defaultOctane",         payload, "fpvehicle/default-octane", _.toNumber);
    populateIfNotNull(form, "takesDiesel",           payload, "fpvehicle/is-diesel");
    populateIfNotNull(form, "hasMpgReadout",         payload, "fpvehicle/has-mpg-readout");
    populateIfNotNull(form, "hasMphReadout",         payload, "fpvehicle/has-mph-readout");
    populateIfNotNull(form, "hasDteReadout",         payload, "fpvehicle/has-dte-readout");
    populateIfNotNull(form, "hasOutsideTempReadout", payload, "fpvehicle/has-outside-temp-readout");
    return payload
}

export function attemptSaveVehicle(vehicleId) {
    return (dispatch, getState) => {
        toastr.info('Saving vehicle...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        dispatch({
            type: actionTypes.SAVE_ENTITY_REQUEST_INITIATED,
            entityId: vehicleId
        })
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, vehicleContentType)
        appendAuthenticatedCommonHeaders(headers, vehicleMediaType, state.authToken)
        const vehicleUri = state.serverSnapshot._embedded.vehicles[vehicleId].location
        const requestPayload = vehicleRequestPayload(state.form.vehicleEdit)
        return fetch(vehicleUri, putInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status))
                return response.json()
            })
            .then(json => {
                dispatch(toastrActions.clean())
                dispatch(receiveServerVehicle(json))
                dispatch(goBack())
                toastr.success("Vehicle saved.", { icon: "icon-check-1", timeOut: 2500 })
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
                toastr.error("Vehicle save failed.")
            })
    }
}
