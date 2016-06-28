import React from "react"
import { push, goBack } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import * as actionTypes from "./actionTypes"
import { toastr } from 'react-redux-toastr'
import { actions as toastrActions } from 'react-redux-toastr'
import * as utils from "../utils"
import * as apiUtils from "./api-utils"
import * as urls from "../urls"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"

const LIGHT_LOGIN_URI          = "http://www.jotyourself.com/gasjot/d/light-login"
const LOGIN_URI                = "http://www.jotyourself.com/gasjot/d/login"
const SIGNUP_URI               = "http://www.jotyourself.com/gasjot/d/users"
const SEND_PWD_RESET_EMAIL_URI = "http://www.jotyourself.com/gasjot/d/send-password-reset-email"

export function cancelRecordEdit() {
    return { type: actionTypes.CANCEL_RECORD_EDIT }
}

export function clearErrors() {
    return { type: actionTypes.CLEAR_ERRORS }
}

export function receiveServerSnapshot(serverSnapshot) {
    return { type: actionTypes.SERVER_SNAPSHOT_RECEIVED, serverSnapshot }
}

export function receiveServerUser(serverUser) {
    return { type: actionTypes.SERVER_USER_RECEIVED, serverUser }
}

export function receiveServerVehicleDeletedAck(serverVehicleId) {
    return { type: actionTypes.SERVER_VEHICLE_DELETED_ACK_RECEIVED, serverVehicleId }
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

export function serverVehicleNotFound(serverVehicleId) {
    return { type: actionTypes.SERVER_VEHICLE_NOT_FOUND,
             serverVehicleId: serverVehicleId }
}

export function serverVehicleNotFoundUserAcknowledged(serverVehicleId) {
    return { type: actionTypes.SERVER_VEHICLE_NOT_FOUND_USER_ACK,
             serverVehicleId: serverVehicleId }
}

export function becameReauthenticated() {
    return { type: actionTypes.BECAME_REAUTHENTICATED }
}

export function passwordResetEmailSent() {
    return { type: actionTypes.PASSWORD_RESET_EMAIL_SENT }
}

export function presentedLightLoginForm() {
    return { type: actionTypes.PRESENTED_LIGHT_LOGIN_FORM }
}

export function receiveServerFuelstation(serverFuelstation) {
    return { type: actionTypes.SERVER_FUELSTATION_RECEIVED, serverFuelstation }
}

export function receiveServerFuelstationDeletedAck(serverFuelstationId) {
    return { type: actionTypes.SERVER_FUELSTATION_DELETED_ACK_RECEIVED, serverFuelstationId }
}

export function receiveServerFuelstationLocation(serverFuelstationId, serverFuelstationLocation) {
    return { type: actionTypes.SERVER_FUELSTATION_LOCATION_RECEIVED,
             serverFuelstationId: serverFuelstationId,
             serverFuelstationLocation: serverFuelstationLocation }
}

export function receiveServerFuelstationMediaType(serverFuelstationId, serverFuelstationMediaType) {
    return { type: actionTypes.SERVER_FUELSTATION_MEDIATYPE_RECEIVED,
             serverFuelstationId: serverFuelstationId,
             serverFuelstationMediaType }
}

export function serverFuelstationNotFound(serverFuelstationId) {
    return { type: actionTypes.SERVER_FUELSTATION_NOT_FOUND,
             serverFuelstationId: serverFuelstationId }
}

export function serverFuelstationNotFoundUserAcknowledged(serverFuelstationId) {
    return { type: actionTypes.SERVER_FUELSTATION_NOT_FOUND_USER_ACK,
             serverFuelstationId: serverFuelstationId }
}

export function receiveServerOdometerLog(serverOdometerLog) {
    return { type: actionTypes.SERVER_ODOMETERLOG_RECEIVED, serverOdometerLog }
}

export function receiveServerOdometerLogDeletedAck(serverOdometerLogId) {
    return { type: actionTypes.SERVER_ODOMETERLOG_DELETED_ACK_RECEIVED, serverOdometerLogId }
}

export function receiveServerOdometerLogLocation(serverOdometerLogId, serverOdometerLogLocation) {
    return { type: actionTypes.SERVER_ODOMETERLOG_LOCATION_RECEIVED,
             serverOdometerLogId: serverOdometerLogId,
             serverOdometerLogLocation: serverOdometerLogLocation }
}

export function receiveServerOdometerLogMediaType(serverOdometerLogId, serverOdometerLogMediaType) {
    return { type: actionTypes.SERVER_ODOMETERLOG_MEDIATYPE_RECEIVED,
             serverOdometerLogId: serverOdometerLogId,
             serverOdometerLogMediaType }
}

export function serverOdometerLogNotFound(serverOdometerLogId) {
    return { type: actionTypes.SERVER_ODOMETERLOG_NOT_FOUND,
             serverOdometerLogId: serverOdometerLogId }
}

export function serverOdometerLogNotFoundUserAcknowledged(serverOdometerLogId) {
    return { type: actionTypes.SERVER_ODOMETERLOG_NOT_FOUND_USER_ACK,
             serverOdometerLogId: serverOdometerLogId }
}

export function receiveServerGasLog(serverGasLog) {
    return { type: actionTypes.SERVER_GASLOG_RECEIVED, serverGasLog }
}

export function receiveServerGasLogDeletedAck(serverGasLogId) {
    return { type: actionTypes.SERVER_GASLOG_DELETED_ACK_RECEIVED, serverGasLogId }
}

export function receiveServerGasLogLocation(serverGasLogId, serverGasLogLocation) {
    return { type: actionTypes.SERVER_GASLOG_LOCATION_RECEIVED,
             serverGasLogId: serverGasLogId,
             serverGasLogLocation: serverGasLogLocation }
}

export function receiveServerGasLogMediaType(serverGasLogId, serverGasLogMediaType) {
    return { type: actionTypes.SERVER_GASLOG_MEDIATYPE_RECEIVED,
             serverGasLogId: serverGasLogId,
             serverGasLogMediaType }
}

export function serverGasLogNotFound(serverGasLogId) {
    return { type: actionTypes.SERVER_GASLOG_NOT_FOUND,
             serverGasLogId: serverGasLogId }
}

export function serverGasLogNotFoundUserAcknowledged(serverGasLogId) {
    return { type: actionTypes.SERVER_GASLOG_NOT_FOUND_USER_ACK,
             serverGasLogId: serverGasLogId }
}

export function receiveAuthenticationToken(authToken) {
    return { type: actionTypes.AUTH_TOKEN_RECEIVED, authToken }
}

export function receiveUserUri(userUri) {
    return { type: actionTypes.USER_URI_RECEIVED, userUri }
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

export function markOdometerLogForEdit(odometerLogId) {
    return { type: actionTypes.MARK_ODOMETERLOG_FOR_EDIT, odometerLogId }
}

export function markGasLogForEdit(gasLogId) {
    return { type: actionTypes.MARK_GASLOG_FOR_EDIT, gasLogId }
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

const odometerLogMediaType = makeMediaType("envlog")
const odometerLogContentType = makeContentType(odometerLogMediaType, charset)

const gasLogMediaType = makeMediaType("fplog")
const gasLogContentType = makeContentType(gasLogMediaType, charset)

export function logout(logoutUri, authToken) {
    return (dispatch) => {
        toastr.info('Processing logout...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, userMediaType, authToken)
        return fetch(logoutUri, apiUtils.postInitForFetch(headers, {}))
            .then(response => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(logoutRequestDone())
                dispatch(push("/loggedOut"))
                toastr.clean()
            })
            .catch(error => {
                // because we're not going to 'gracefully' handle this from a user-perspective...because the user can't
                // really do anything about it, and, because we'll still be deleting from localStorage the authentication
                // token, we're pretty much good
                dispatch(apiUtils.apiRequestDone())
                dispatch(logoutRequestDone())
                dispatch(push("/loggedOut"))
                toastr.clean()
            })
    }
}

export function attemptSignUp() {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Creating account...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.FP_ESTABLISH_SESSION_HEADER, "true")
        headers.append(apiUtils.FP_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.FP_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/name": state.form.signup.name.value,
            "user/email": state.form.signup.email.value,
            "user/password": state.form.signup.password.value
        };
        return fetch(SIGNUP_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.FP_AUTH_TOKEN_HEADER)))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.FP_ERR_MASK_HEADER)))
                return response.json()
            })
            .then(json => {
                dispatch(receiveServerSnapshot(json))
                dispatch(toastrActions.clean())
                dispatch(push("/accountCreated"))
                toastr.success("Account created successfully!", apiUtils.toastConfigSuccess())
            })
            .catch(error => {
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
            })
    }
}

export function attemptLogin(nextSuccessPathname) {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Logging you in...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.FP_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.FP_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/username-or-email": state.form.login.usernameOrEmail.value,
            "user/password": state.form.login.password.value
        };
        return fetch(LOGIN_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.FP_AUTH_TOKEN_HEADER)))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.FP_ERR_MASK_HEADER)))
                if (response.status == 401) {
                    toastr.error("Login failed.", apiUtils.toastConfigError())
                } else {
                    return response.json().then(json => {
                        dispatch(receiveServerSnapshot(json))
                        dispatch(push(nextSuccessPathname))
                        dispatch(toastrActions.clean())
                        toastr.success("Welcome Back", "You are now logged in.", apiUtils.toastConfigSuccess())
                    })
                }
            })
            .catch(error => {
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                toastr.error("Server error.  Please try again.", apiUtils.toastConfigError())
            })
    }
}

export function attemptLightLogin(operationOnSuccess) {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Re-authenticating...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.FP_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.FP_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/username-or-email": state.form.login.usernameOrEmail.value,
            "user/password": state.form.login.password.value
        };
        return fetch(LIGHT_LOGIN_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.FP_AUTH_TOKEN_HEADER)))
                //dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.FP_ERR_MASK_HEADER)))
                if (response.status == 204) {
                    dispatch(toastrActions.clean())
                    dispatch(becameReauthenticated())
                    if (operationOnSuccess != null) {
                        operationOnSuccess() // this will presumably come with its own toasts, so we won't bother with the 'You've been re-auth'd' toast
                    } else {
                        toastr.success("Success", "You've been re-authenticated.", apiUtils.toastConfigSuccess())
                    }
                } else {
                    toastr.clean()
                    dispatch(apiUtils.apiRequestDone())
                }
            })
            .catch(error => {
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
            })
    }
}

export function attemptSendPasswordResetEmail() {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Please wait...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        const requestPayload = {
            "user/email": state.form.forgotpassword.email.value
        };
        return fetch(SEND_PWD_RESET_EMAIL_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.FP_ERR_MASK_HEADER)))
                if (response.status == 204) {
                    dispatch(toastrActions.clean())
                    dispatch(passwordResetEmailSent())
                    toastr.success("Password reset email sent", apiUtils.toastConfigSuccess())
                } else {
                    toastr.clean()
                    dispatch(apiUtils.apiRequestDone())
                }
            })
            .catch(error => {
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                toastr.error("There was a problem sending your the password reset email.", toastConfigError())
            })
    }
}

const vehicleRequestPayload = form => {
    let payload = {}
    utils.formToModelIfNotNull(form, "name",                  payload, "fpvehicle/name");
    utils.formToModelIfNotNull(form, "plate",                 payload, "fpvehicle/plate");
    utils.formToModelIfNotNull(form, "vin",                   payload, "fpvehicle/vin");
    utils.formToModelIfNotNull(form, "fuelCapacity",          payload, "fpvehicle/fuel-capacity", null, _.toNumber);
    utils.formToModelIfNotNull(form, "defaultOctane",         payload, "fpvehicle/default-octane", null, _.toNumber);
    utils.formToModelIfNotNull(form, "takesDiesel",           payload, "fpvehicle/is-diesel");
    utils.formToModelIfNotNull(form, "hasMpgReadout",         payload, "fpvehicle/has-mpg-readout");
    utils.formToModelIfNotNull(form, "hasMphReadout",         payload, "fpvehicle/has-mph-readout");
    utils.formToModelIfNotNull(form, "hasDteReadout",         payload, "fpvehicle/has-dte-readout");
    utils.formToModelIfNotNull(form, "hasOutsideTempReadout", payload, "fpvehicle/has-outside-temp-readout");
    return payload
}

const userRequestPayload = form => {
    let payload = {}
    utils.formToModelIfNotNull(form, "name", payload, "user/name")
    utils.formToModelIfNotNull(form, "email", payload, "user/email")
    if (form.password.value != null && !_.isEmpty(form.password.value)) {
        payload["user/password"] = form.password.value
    }
    return payload
}

export function attemptSaveUser() {
    return (dispatch, getState) => {
        toastr.info('Saving user account...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, userMediaType, state.authToken)
        const userUri = state.userUri
        const requestPayload = userRequestPayload(state.form.userAccountEdit)
        return fetch(userUri, apiUtils.putInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.FP_ERR_MASK_HEADER)))
                return response.json()
            })
            .then(json => {
                dispatch(toastrActions.clean())
                dispatch(receiveServerUser(json))
                dispatch(goBack())
                toastr.success("User account saved.", apiUtils.toastConfigSuccess())
            })
            .catch(error => {
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                toastr.error("User account save failed.")
            })
    }
}

function getVehiclesUri(state) {
    return state.serverSnapshot._links.vehicles.href
}

function getVehicleUri(state, vehicleId) {
    return state.serverSnapshot._embedded.vehicles[vehicleId].location
}

function getVehicleUpdatedAt(state, vehicleId) {
    return state.serverSnapshot._embedded.vehicles[vehicleId].payload["fpvehicle/updated-at"]
}

function getFuelstationsUri(state) {
    return state.serverSnapshot._links.fuelstations.href
}

function getFuelstationUri(state, fuelstationId) {
    return state.serverSnapshot._embedded.fuelstations[fuelstationId].location
}

function getFuelstationUpdatedAt(state, fuelstationId) {
    return state.serverSnapshot._embedded.fuelstations[fuelstationId].payload["fpfuelstation/updated-at"]
}

function getOdometerLogsUri(state) {
    return state.serverSnapshot._links["environment-logs"].href
}

function getOdometerLogUri(state, odometerLogId) {
    return state.serverSnapshot._embedded.envlogs[odometerLogId].location
}

function getOdometerLogUpdatedAt(state, odometerLogId) {
    return state.serverSnapshot._embedded.envlogs[odometerLogId].payload["envlog/updated-at"]
}

function getGasLogsUri(state) {
    return state.serverSnapshot._links["fuelpurchase-logs"].href
}

function getGasLogUri(state, gasLogId) {
    return state.serverSnapshot._embedded.fplogs[gasLogId].location
}

function getGasLogUpdatedAt(state, gasLogId) {
    return state.serverSnapshot._embedded.fplogs[gasLogId].payload["fplog/updated-at"]
}

export const attemptDownloadVehicle = apiUtils.makeAttemptDownloadEntityFn(
    "vehicle",
    vehicleMediaType,
    getVehicleUpdatedAt,
    getVehicleUri,
    receiveServerVehicle,
    serverVehicleNotFound)

export const attemptSaveVehicle = apiUtils.makeAttemptSaveEntityFn(
    "vehicle",
    vehicleContentType,
    vehicleMediaType,
    getVehicleUpdatedAt,
    getVehicleUri,
    vehicleRequestPayload,
    "vehicle",
    attemptDownloadVehicle,
    urls.vehicleEditUrl,
    receiveServerVehicle,
    serverVehicleNotFound)

export const attemptDeleteVehicle = apiUtils.makeAttemptDeleteEntityFn(
    "vehicle",
    vehicleMediaType,
    getVehicleUpdatedAt,
    getVehicleUri,
    attemptDownloadVehicle,
    urls.vehicleDetailUrl,
    receiveServerVehicleDeletedAck,
    serverVehicleNotFound)

export const attemptSaveNewVehicle = apiUtils.makeAttemptSaveNewEntity(
    "vehicle",
    vehicleContentType,
    vehicleMediaType,
    getVehiclesUri,
    vehicleRequestPayload,
    "vehicle",
    "fpvehicle/id",
    receiveServerVehicleLocation,
    receiveServerVehicleMediaType,
    receiveServerVehicle)

const fuelstationRequestPayload = form => {
    var payload = {}
    utils.formToModelIfNotNull(form, "name",                  payload, "fpfuelstation/name");
    utils.formToModelIfNotNull(form, "typeId",                payload, "fpfuelstation/type-id", "id", null);
    utils.formToModelIfNotNull(form, "street",                payload, "fpfuelstation/street");
    utils.formToModelIfNotNull(form, "city",                  payload, "fpfuelstation/city");
    utils.formToModelIfNotNull(form, "state",                 payload, "fpfuelstation/state");
    utils.formToModelIfNotNull(form, "zip",                   payload, "fpfuelstation/zip");
    utils.formToModelIfNotNull(form, "latitude",              payload, "fpfuelstation/latitude", null, _.toNumber);
    utils.formToModelIfNotNull(form, "longitude",             payload, "fpfuelstation/longitude", null, _.toNumber);
    return payload
}

export const attemptDownloadFuelstation = apiUtils.makeAttemptDownloadEntityFn(
    "gas station",
    fuelstationMediaType,
    getFuelstationUpdatedAt,
    getFuelstationUri,
    receiveServerFuelstation,
    serverFuelstationNotFound)

export const attemptSaveFuelstation = apiUtils.makeAttemptSaveEntityFn(
    "gas station",
    fuelstationContentType,
    fuelstationMediaType,
    getFuelstationUpdatedAt,
    getFuelstationUri,
    fuelstationRequestPayload,
    "fuelstation",
    attemptDownloadFuelstation,
    urls.fuelstationEditUrl,
    receiveServerFuelstation,
    serverFuelstationNotFound)

export const attemptDeleteFuelstation = apiUtils.makeAttemptDeleteEntityFn(
    "fuelstation",
    fuelstationMediaType,
    getFuelstationUpdatedAt,
    getFuelstationUri,
    attemptDownloadFuelstation,
    urls.fuelstationDetailUrl,
    receiveServerFuelstationDeletedAck,
    serverFuelstationNotFound)

export const attemptSaveNewFuelstation = apiUtils.makeAttemptSaveNewEntity(
    "fuelstation",
    fuelstationContentType,
    fuelstationMediaType,
    getFuelstationsUri,
    fuelstationRequestPayload,
    "fuelstation",
    "fpfuelstation/id",
    receiveServerFuelstationLocation,
    receiveServerFuelstationMediaType,
    receiveServerFuelstation)

const odometerLogRequestPayloadFnMaker = vehicles => {
    return form => {
        momentLocalizer(moment)
        var payload = {}
        utils.formToModelIfNotNull(form, "vehicleId",          payload, "envlog/vehicle",               "fpvehicle/id", vehicleId => vehicles[vehicleId].location)
        utils.formToModelIfNotNull(form, "logDate",            payload, "envlog/logged-at",             null,           loggedAtStr => utils.toUnixEpoch(moment, loggedAtStr))
        utils.formToModelIfNotNull(form, "odometer",           payload, "envlog/odometer",              null,           _.toNumber)
        utils.formToModelIfNotNull(form, "avgMpgReadout",      payload, "envlog/reported-avg-mpg",      null,           _.toNumber)
        utils.formToModelIfNotNull(form, "avgMphReadout",      payload, "envlog/reported-avg-mph",      null,           _.toNumber)
        utils.formToModelIfNotNull(form, "rangeReadout",       payload, "envlog/dte",                   null,           _.toNumber)
        utils.formToModelIfNotNull(form, "outsideTempReadout", payload, "envlog/reported-outside-temp", null,           _.toNumber)
        return payload
    }
}

export const attemptDownloadOdometerLog = apiUtils.makeAttemptDownloadEntityFn(
    "odometer log",
    odometerLogMediaType,
    getOdometerLogUpdatedAt,
    getOdometerLogUri,
    receiveServerOdometerLog,
    serverOdometerLogNotFound)

export const attemptSaveOdometerLogFnMaker = vehicles =>
    apiUtils.makeAttemptSaveEntityFn(
        "odometer log",
        odometerLogContentType,
        odometerLogMediaType,
        getOdometerLogUpdatedAt,
        getOdometerLogUri,
        odometerLogRequestPayloadFnMaker(vehicles),
        "odometerlog",
        attemptDownloadOdometerLog,
        urls.odometerLogEditUrl,
        receiveServerOdometerLog,
        serverOdometerLogNotFound)

export const attemptDeleteOdometerLog = apiUtils.makeAttemptDeleteEntityFn(
    "odometer log",
    odometerLogMediaType,
    getOdometerLogUpdatedAt,
    getOdometerLogUri,
    attemptDownloadOdometerLog,
    urls.odometerLogDetailUrl,
    receiveServerOdometerLogDeletedAck,
    serverOdometerLogNotFound)

export const attemptSaveNewOdometerLogFnMaker = vehicles =>
    apiUtils.makeAttemptSaveNewEntity(
        "odometer log",
        odometerLogContentType,
        odometerLogMediaType,
        getOdometerLogsUri,
        odometerLogRequestPayloadFnMaker(vehicles),
        "odometerlog",
        "envlog/id",
        receiveServerOdometerLogLocation,
        receiveServerOdometerLogMediaType,
        receiveServerOdometerLog)

const gasLogRequestPayloadFnMaker = (vehicles, fuelstations) => {
    return form => {
        momentLocalizer(moment)
        var payload = {}
        utils.formToModelIfNotNull(form, "vehicleId",                payload, "fplog/vehicle",                   "fpvehicle/id",     vehicleId => vehicles[vehicleId].location)
        utils.formToModelIfNotNull(form, "fuelstationId",            payload, "fplog/fuelstation",               "fpfuelstation/id", fuelstationId => fuelstations[fuelstationId].location)
        utils.formToModelIfNotNull(form, "purchaseDate",             payload, "fplog/purchased-at",              null,               purchasedAtStr => utils.toUnixEpoch(moment, purchasedAtStr))
        utils.formToModelIfNotNull(form, "octane",                   payload, "fplog/octane",                    null, _.toNumber)
        utils.formToModelIfNotNull(form, "odometer",                 payload, "fplog/odometer",                  null, _.toNumber)
        utils.formToModelIfNotNull(form, "pricePerGallon",           payload, "fplog/gallon-price",              null, _.toNumber)
        utils.formToModelIfNotNull(form, "gotCarWash",               payload, "fplog/got-car-wash")
        utils.formToModelIfNotNull(form, "carWashPerGallonDiscount", payload, "fplog/car-wash-per-gal-discount", null, _.toNumber)
        utils.formToModelIfNotNull(form, "numGallons",               payload, "fplog/num-gallons",               null, _.toNumber)
        return payload
    }
}

export const attemptDownloadGasLog = apiUtils.makeAttemptDownloadEntityFn(
    "gas log",
    gasLogMediaType,
    getGasLogUpdatedAt,
    getGasLogUri,
    receiveServerGasLog,
    serverGasLogNotFound)

export const attemptSaveGasLogFnMaker = (vehicles, fuelstations) =>
    apiUtils.makeAttemptSaveEntityFn(
        "gas log",
        gasLogContentType,
        gasLogMediaType,
        getGasLogUpdatedAt,
        getGasLogUri,
        gasLogRequestPayloadFnMaker(vehicles, fuelstations),
        "gaslog",
        attemptDownloadGasLog,
        urls.gasLogEditUrl,
        receiveServerGasLog,
        serverGasLogNotFound)

export const attemptDeleteGasLog = apiUtils.makeAttemptDeleteEntityFn(
    "gas log",
    gasLogMediaType,
    getGasLogUpdatedAt,
    getGasLogUri,
    attemptDownloadGasLog,
    urls.gasLogDetailUrl,
    receiveServerGasLogDeletedAck,
    serverGasLogNotFound)

export const attemptSaveNewGasLogFnMaker = (vehicles, fuelstations) =>
    apiUtils.makeAttemptSaveNewEntity(
        "gas log",
        gasLogContentType,
        gasLogMediaType,
        getGasLogsUri,
        gasLogRequestPayloadFnMaker(vehicles, fuelstations),
        "gaslog",
        "fplog/id",
        receiveServerGasLogLocation,
        receiveServerGasLogMediaType,
        receiveServerGasLog)
