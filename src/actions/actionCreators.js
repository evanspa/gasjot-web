import React from "react"
import { push, goBack } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import * as actionTypes from "./actionTypes"
import {toastr} from 'react-redux-toastr'
import {actions as toastrActions} from 'react-redux-toastr'
import { formToModelIfNotNull } from "../utils"

const LOGIN_URI = "http://www.jotyourself.com/gasjot/d/login"
const SIGNUP_URI = "http://www.jotyourself.com/gasjot/d/users"
const FP_AUTH_TOKEN_HEADER = "fp-auth-token"
const FP_ERR_MASK_HEADER = "fp-error-mask"
const FP_ESTABLISH_SESSION_HEADER = "fp-establish-session"
const FP_DESIRED_EMBEDDED_FORMAT_HEADER = "fp-desired-embedded-format"
const FP_ID_KEYED_EMBEDDED_FORMAT = "id-keyed"

export function receiveServerSnapshot(serverSnapshot) {
    return { type: actionTypes.SERVER_SNAPSHOT_RECEIVED, serverSnapshot }
}

export function receiveServerUser(serverUser) {
    return { type: actionTypes.SERVER_USER_RECEIVED, serverUser }
}

export function receiveServerVehicle(serverVehicle) {
    return { type: actionTypes.SERVER_VEHICLE_RECEIVED, serverVehicle }
}

export function receiveServerVehicleLocation(serverVehicleId, serverVehicleLocation) {
    return { type: actionTypes.SERVER_VEHICLE_LOCATION_RECEIVED,
             serverVehicleId: serverVehicleId,
             serverVehicleLocation: serverVehicleLocation }
}

export function receiveServerVehicleMediaType(serverVehicleId, serverVehicleMediaType) {
    return { type: actionTypes.SERVER_VEHICLE_MEDIATYPE_RECEIVED,
             serverVehicleId: serverVehicleId,
             serverVehicleMediaType }
}

export function receiveServerFuelstation(serverFuelstation) {
    return { type: actionTypes.SERVER_FUELSTATION_RECEIVED, serverFuelstation }
}

export function receiveAuthenticationToken(authToken) {
    return { type: actionTypes.AUTH_TOKEN_RECEIVED, authToken }
}

export function receiveUserUri(userUri) {
    return { type: actionTypes.USER_URI_RECEIVED, userUri }
}

export function receiveResponseStatus(responseStatus, fpErrorMask = null) {
    let action = { type: actionTypes.RESPONSE_STATUS_RECEIVED,
                   responseStatus: responseStatus }
    if (fpErrorMask != null) {
        action.fpErrorMask = _.toNumber(fpErrorMask)
    }
    return action
}

export function logoutRequestInitiated() {
    return { type: actionTypes.LOGOUT_REQUEST_INITIATED }
}

export function logoutRequestDone() {
    return { type: actionTypes.LOGOUT_REQUEST_DONE }
}

export function markUserForEdit() {
    return { type: actionTypes.MARK_USER_FOR_EDIT }
}

export function markVehicleForEdit(vehicleId) {
    return { type: actionTypes.MARK_VEHICLE_FOR_EDIT, vehicleId }
}

export function markFuelstationForEdit(fuelstationId) {
    return { type: actionTypes.MARK_FUELSTATION_FOR_EDIT, fuelstationId }
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

const fuelstationMediaType = makeMediaType("fuelstation")
const fuelstationContentType = makeContentType(fuelstationMediaType, charset)

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

export function attemptSignUp() {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Creating account...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const headers = new Headers()
        appendContentType(headers, userContentType)
        appendCommonHeaders(headers, userMediaType)
        headers.append(FP_ESTABLISH_SESSION_HEADER, "true")
        headers.append(FP_DESIRED_EMBEDDED_FORMAT_HEADER, FP_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/name": state.form.signup.name.value,
            "user/email": state.form.signup.email.value,
            "user/password": state.form.signup.password.value
        };
        return fetch(SIGNUP_URI, postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveAuthenticationToken(response.headers.get(FP_AUTH_TOKEN_HEADER)))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                return response.json()
            })
            .then(json => {
                dispatch(receiveServerSnapshot(json))
                dispatch(toastrActions.clean())
                dispatch(push("/accountCreated"))
                toastr.success("Account created successfully!", { icon: "icon-check-1", timeOut: 3000 })
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
            })
    }
}

export function attemptLogin(nextSuccessPathname) {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Logging you in...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const headers = new Headers()
        appendContentType(headers, userContentType)
        appendCommonHeaders(headers, userMediaType)
        headers.append(FP_DESIRED_EMBEDDED_FORMAT_HEADER, FP_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/username-or-email": state.form.login.usernameOrEmail.value,
            "user/password": state.form.login.password.value
        };
        return fetch(LOGIN_URI, postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveAuthenticationToken(response.headers.get(FP_AUTH_TOKEN_HEADER)))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
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
            })
    }
}

const vehicleRequestPayload = form => {
    let payload = {}
    formToModelIfNotNull(form, "name",                  payload, "fpvehicle/name");
    formToModelIfNotNull(form, "plate",                 payload, "fpvehicle/plate");
    formToModelIfNotNull(form, "vin",                   payload, "fpvehicle/vin");
    formToModelIfNotNull(form, "fuelCapacity",          payload, "fpvehicle/fuel-capacity", null, _.toNumber);
    formToModelIfNotNull(form, "defaultOctane",         payload, "fpvehicle/default-octane", null, _.toNumber);
    formToModelIfNotNull(form, "takesDiesel",           payload, "fpvehicle/is-diesel");
    formToModelIfNotNull(form, "hasMpgReadout",         payload, "fpvehicle/has-mpg-readout");
    formToModelIfNotNull(form, "hasMphReadout",         payload, "fpvehicle/has-mph-readout");
    formToModelIfNotNull(form, "hasDteReadout",         payload, "fpvehicle/has-dte-readout");
    formToModelIfNotNull(form, "hasOutsideTempReadout", payload, "fpvehicle/has-outside-temp-readout");
    return payload
}

const userRequestPayload = form => {
    let payload = {}
    formToModelIfNotNull(form, "name", payload, "user/name")
    formToModelIfNotNull(form, "email", payload, "user/email")
    if (form.password.value != null && !_.isEmpty(form.password.value)) {
        payload["user/password"] = form.password.value
    }
    return payload
}

export function attemptSaveUser() {
    return (dispatch, getState) => {
        toastr.info('Saving user account...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, userContentType)
        appendAuthenticatedCommonHeaders(headers, userMediaType, state.authToken)
        const userUri = state.userUri
        const requestPayload = userRequestPayload(state.form.userAccountEdit)
        return fetch(userUri, putInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                return response.json()
            })
            .then(json => {
                dispatch(toastrActions.clean())
                dispatch(receiveServerUser(json))
                dispatch(goBack())
                toastr.success("User account saved.", { icon: "icon-check-1", timeOut: 2500 })
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
                toastr.error("User account save failed.")
            })
    }
}

export function attemptSaveVehicle(vehicleId) {
    return (dispatch, getState) => {
        toastr.info('Saving vehicle...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, vehicleContentType)
        appendAuthenticatedCommonHeaders(headers, vehicleMediaType, state.authToken)
        const vehicleUri = state.serverSnapshot._embedded.vehicles[vehicleId].location
        const requestPayload = vehicleRequestPayload(state.form.vehicle)
        console.log("in save vhielce, request: " + JSON.stringify(requestPayload))
        return fetch(vehicleUri, putInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
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

export function attemptSaveNewVehicle(nextPathname) {
    return (dispatch, getState) => {
        toastr.info('Saving vehicle...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, vehicleContentType)
        appendAuthenticatedCommonHeaders(headers, vehicleMediaType, state.authToken)
        const vehiclesUri = state.serverSnapshot._links.vehicles.href
        const requestPayload = vehicleRequestPayload(state.form.vehicle)
        return fetch(vehiclesUri, postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                const location = response.headers.get("location")
                const vehicleId = _.last(_.split(location, "/")) // brittle!
                dispatch(receiveServerVehicleLocation(vehicleId, location))
                dispatch(receiveServerVehicleMediaType(vehicleId, response.headers.get("content-type")))
                return response.json()
            })
            .then(json => {
                dispatch(toastrActions.clean())
                dispatch(receiveServerVehicle(json))
                if (nextPathname != null) {
                    dispatch(push(nextPathname))
                } else {
                    dispatch(goBack())
                }
                toastr.success("Vehicle saved.", { icon: "icon-check-1", timeOut: 2500 })
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
                toastr.error("Vehicle save failed.")
            })
    }
}

const fuelstationRequestPayload = form => {
    var payload = {}
    formToModelIfNotNull(form, "name",                  payload, "fpfuelstation/name");
    formToModelIfNotNull(form, "typeId",                payload, "fpfuelstation/type-id", "id", null);
    formToModelIfNotNull(form, "street",                payload, "fpfuelstation/street");
    formToModelIfNotNull(form, "city",                  payload, "fpfuelstation/city");
    formToModelIfNotNull(form, "state",                 payload, "fpfuelstation/state");
    formToModelIfNotNull(form, "zip",                   payload, "fpfuelstation/zip");
    formToModelIfNotNull(form, "latitude",              payload, "fpfuelstation/latitude", null, _.toNumber);
    formToModelIfNotNull(form, "longitude",             payload, "fpfuelstation/longitude", null, _.toNumber);
    return payload
}

export function attemptSaveFuelstation(fuelstationId) {
    return (dispatch, getState) => {
        toastr.info('Saving gas station...', { transitionIn: "fadeIn", transitionOut: "fadeOut" })
        dispatch(apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, fuelstationContentType)
        appendAuthenticatedCommonHeaders(headers, fuelstationMediaType, state.authToken)
        const fuelstationUri = state.serverSnapshot._embedded.fuelstations[fuelstationId].location
        const requestPayload = fuelstationRequestPayload(state.form.fuelstation)
        return fetch(fuelstationUri, putInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                return response.json()
            })
            .then(json => {
                dispatch(toastrActions.clean())
                dispatch(receiveServerFuelstation(json))
                dispatch(goBack())
                toastr.success("Gas station saved.", { icon: "icon-check-1", timeOut: 2500 })
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
                toastr.error("Gas station save failed.")
            })
    }
}
