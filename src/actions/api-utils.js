import fetch from 'isomorphic-fetch'
import { toastr } from 'react-redux-toastr'
import { actions as toastrActions } from 'react-redux-toastr'
import { push, goBack } from 'react-router-redux'
import * as actionTypes from "./actionTypes"

export const FP_AUTH_TOKEN_HEADER = "fp-auth-token"
export const FP_ERR_MASK_HEADER = "fp-error-mask"
export const FP_ESTABLISH_SESSION_HEADER = "fp-establish-session"
export const FP_DESIRED_EMBEDDED_FORMAT_HEADER = "fp-desired-embedded-format"
export const FP_IF_MODIFIED_SINCE_HEADER = "fp-if-modified-since"
export const FP_IF_UNMODIFIED_SINCE_HEADER = "fp-if-unmodified-since"
export const FP_ID_KEYED_EMBEDDED_FORMAT = "id-keyed"

const initForFetch = (headers, payload, method) => {
    let init = {}
    init.method = method
    init.headers = headers
    if (payload != null) {
        init.body = JSON.stringify(payload)
    }
    return init
}

export const postInitForFetch   = (headers, payload) => initForFetch(headers, payload, "POST")
export const putInitForFetch    = (headers, payload) => initForFetch(headers, payload, "PUT")
export const getInitForFetch    = (headers)          => initForFetch(headers, null,    "GET")
export const deleteInitForFetch = (headers)          => initForFetch(headers, null,    "DELETE")

export function receiveResponseStatus(responseStatus, fpErrorMask = null) {
    let action = { type: actionTypes.RESPONSE_STATUS_RECEIVED,
                   responseStatus: responseStatus }
    if (fpErrorMask != null) {
        action.fpErrorMask = _.toNumber(fpErrorMask)
    }
    return action
}

export function becameUnauthenticated() {
    return { type: actionTypes.BECAME_UNAUTHENTICATED }
}

export function apiRequestDone() {
    return { type: actionTypes.API_REQUEST_DONE }
}

export const appendContentType = (headers, contentType) => {
    headers.append("Content-Type", contentType)
}

export const appendCommonHeaders = (headers, mediaType) => {
    headers.append("Accept-Language", "en-US")
    headers.append("Accept", mediaType)
}

export const appendAuthenticatedCommonHeaders = (headers, mediaType, authToken) => {
    appendCommonHeaders(headers, mediaType)
    headers.append("Authorization", "fp-auth fp-token=\"" + authToken + "\"")
}

function entitySavingMessage(entityType) {
    return "Saving " + entityType + "..."
}

function entityDeletingMessage(entityType) {
    return "Deleting " + entityType + "..."
}

function entitySavedMessage(entityType) {
    return _.capitalize(entityType) + " saved"
}

function entityDeletedMessage(entityType) {
    return _.capitalize(entityType) + " deleted"
}

function entitySaveFailedMessage(entityType) {
    return _.capitalize(entityType) + " save failed"
}

function entityDeleteFailedMessage(entityType) {
    return _.capitalize(entityType) + " delete failed"
}

function entityConflictMessage(entityType) {
    return "The remote copy of this " + entityType + " has been modified since you last downloaded it.  Would you like to download the latest copy?"
}

function entityDownloadingMessage(entityType) {
    return "Downloading latest copy of " + entityType + "..."
}

function toastAlreadyHaveLatest(entityType) {
    toastr.info("Already have latest", "You already have the latest version of this " + entityType + " record.", toastConfigAlreadyHaveLatest())
}

function toastDownloadedSuccess(entityType) {
    toastr.success(_.capitalize(entityType) + " downloaded", "The latest version of this " + entityType + " record has been downloaded.", toastConfigLatestDownloaded())
}

function problemDownloadingLatestMessage(entityType) {
    return "There was a problem attempting to download the latest version of this " + entityType + " record."
}

function checkBecameUnauthenticated(response, dispatch) {
    if (response.status == 401) {
        dispatch(becameUnauthenticated())
        return true
    }
    return false
}

const TOASTR_TIMEOUT_ALREADY_HAVE_LATEST = 3500
const TOASTR_TIMEOUT_CONFLICT            = 3500
const TOASTR_TIMEOUT_LATEST_DOWNLOADED   = 3500
const TOASTR_TIMEOUT_ERROR               = 2500
const TOASTR_TIMEOUT_SUCCESS             = 2000

export function toastConfigCheckmark(timeOut) {
    return { icon: "icon-check-1", timeOut: timeOut }
}

export function toastConfigAlreadyHaveLatest() {
    return toastConfigCheckmark(TOASTR_TIMEOUT_ALREADY_HAVE_LATEST)
}

export function toastConfigConflict() {
    return { timeOut: TOASTR_TIMEOUT_CONFLICT }
}

export function toastConfigLatestDownloaded() {
    return toastConfigCheckmark(TOASTR_TIMEOUT_LATEST_DOWNLOADED)
}

export function toastConfigError() {
    return { timeOut: TOASTR_TIMEOUT_ERROR }
}

export function toastConfigSuccess() {
    return toastConfigCheckmark(TOASTR_TIMEOUT_SUCCESS)
}

export function toastConfigWorkingOnIt() {
    return { transitionIn: "fadeIn", transitionOut: "fadeOut" }
}

export function apiRequestInitiated() {
    return { type: actionTypes.API_REQUEST_INITIATED }
}

export function makeAttemptDownloadEntityFn(
    entityType,
    entityMediaType,
    getEntityUpdatedAtFn,
    getEntityUriFn,
    receiveServerEntityFn) {
    return (entityId, refreshUri) => {
        return (dispatch, getState) => {
            toastr.info(entityDownloadingMessage(entityType), toastConfigWorkingOnIt())
            dispatch(apiRequestInitiated())
            const state = getState()
            const headers = new Headers()
            appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken)
            headers.append(FP_IF_MODIFIED_SINCE_HEADER, getEntityUpdatedAtFn(state, entityId))
            const entityUri = getEntityUriFn(state, entityId)
            return fetch(entityUri, getInitForFetch(headers))
                .then(response => {
                    dispatch(toastrActions.clean())
                    dispatch(apiRequestDone())
                    dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                    if (!checkBecameUnauthenticated(response, dispatch)) {
                        if (response.status == 304) {
                            toastAlreadyHaveLatest(entityType)
                        } else if (response.status == 200) {
                            toastDownloadedSuccess(entityType)
                            return response.json().then(json => {
                                dispatch(receiveServerEntityFn(json))
                                dispatch(push(refreshUri))
                            })
                        } else if (!response.ok) {
                            toastr.error(problemDownloadingLatestMessage(entityType), toastConfigError())
                        }
                    }
                })
                .catch(error => {
                    dispatch(apiRequestDone())
                    dispatch(toastrActions.clean())
                    toastr.error(problemDownloadingLatestMessage(entityType), toastConfigError())
                })
        }
    }
}

export function makeAttemptSaveNewEntity(
    entityType,
    entityContentType,
    entityMediaType,
    getEntitiesUriFn,
    entityRequestPayloadFn,
    entityFormName,
    entityIdKeyName,
    receiveServerEntityLocationFn,
    receiveServerEntityMediaTypeFn,
    receiveServerEntityFn) {
    return (nextPathname) => {
        return (dispatch, getState) => {
        toastr.info(entitySavingMessage(entityType), toastConfigWorkingOnIt())
        dispatch(apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, entityContentType)
        appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken)
        const entitiesUri = getEntitiesUriFn(state)
        const requestPayload = entityRequestPayloadFn(state.form[entityFormName])
        return fetch(entitiesUri, postInitForFetch(headers, requestPayload))
            .then(response => {
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                if (!checkBecameUnauthenticated(response, dispatch)) {
                    if (response.status == 201) {
                        const location = response.headers.get("location")
                        return response.json().then(json => {
                            dispatch(toastrActions.clean())
                            const entityId = json[entityIdKeyName]
                            dispatch(receiveServerEntityLocationFn(entityId, location))
                            dispatch(receiveServerEntityMediaTypeFn(entityId, response.headers.get("content-type")))
                            dispatch(receiveServerEntityFn(json))
                            if (nextPathname != null) {
                                dispatch(push(nextPathname))
                            } else {
                                dispatch(goBack())
                            }
                            toastr.success(entitySavedMessage(entityType), toastConfigSuccess())
                        })
                    } else if (!response.ok) {
                        toastr.clean()
                        toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                    }
                }
            })
            .catch(error => {
                dispatch(apiRequestDone())
                toastr.clean()
                toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
            })
        }
    }
}

export function makeAttemptSaveEntityFn(entityType,
                                        entityContentType,
                                        entityMediaType,
                                        getEntityUpdatedAtFn,
                                        getEntityUriFn,
                                        entityRequestPayloadFn,
                                        entityFormName,
                                        attemptDownloadEntityFn,
                                        entityEditUrlFn,
                                        receiveServerEntityFn) {
    return (entityId) => {
        return (dispatch, getState) => {
            toastr.info(entitySavingMessage(entityType), toastConfigWorkingOnIt())
            dispatch(apiRequestInitiated())
            const state = getState()
            const headers = new Headers()
            appendContentType(headers, entityContentType)
            appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken)
            headers.append(FP_IF_UNMODIFIED_SINCE_HEADER, getEntityUpdatedAtFn(state, entityId))
            const entityUri = getEntityUriFn(state, entityId)
            const requestPayload = entityRequestPayloadFn(state.form[entityFormName])
            return fetch(entityUri, putInitForFetch(headers, requestPayload))
                .then(response => {
                    dispatch(apiRequestDone())
                    dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                    if (!checkBecameUnauthenticated(response, dispatch)) {
                        if (response.status == 409) {
                            toastr.clean()
                            const confirmOptions = {
                                onOk: () => dispatch(attemptDownloadEntityFn(entityId, entityEditUrlFn(entityId)))
                            }
                            toastr.confirm(entityConflictMessage(entityType), confirmOptions)
                        } else if (response.status == 200) {
                            return response.json().then(json => {
                                dispatch(toastrActions.clean())
                                dispatch(receiveServerEntityFn(json))
                                dispatch(goBack())
                                toastr.success(entitySavedMessage(entityType), toastConfigSuccess())
                            })
                        } else if (!response.ok) {
                            toastr.clean()
                            toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                        }
                    }
                })
                .catch(error => {
                    dispatch(apiRequestDone())
                    toastr.clean()
                    toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                })
        }
    }
}

export function makeAttemptDeleteEntityFn(entityType,
                                          entityMediaType,
                                          getEntityUpdatedAtFn,
                                          getEntityUriFn,
                                          attemptDownloadEntityFn,
                                          entityDetailUrlFn,
                                          receiveServerEntityDeletedAckFn) {
    return (entityId) => {
        return (dispatch, getState) => {
            toastr.info(entityDeletingMessage(entityType), toastConfigWorkingOnIt())
            dispatch(apiRequestInitiated())
            const state = getState()
            const headers = new Headers()
            appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken)
            headers.append(FP_IF_UNMODIFIED_SINCE_HEADER, getEntityUpdatedAtFn(state, entityId))
            const entityUri = getEntityUriFn(state, entityId)
            return fetch(entityUri, deleteInitForFetch(headers))
                .then(response => {
                    dispatch(apiRequestDone())
                    dispatch(receiveResponseStatus(response.status, response.headers.get(FP_ERR_MASK_HEADER)))
                    if (!checkBecameUnauthenticated(response, dispatch)) {
                        if (response.status == 409) {
                            toastr.clean()
                            const confirmOptions = {
                                onOk: () => dispatch(attemptDownloadEntityFn(entityId, entityDetailUrlFn(entityId)))
                            }
                            toastr.confirm(entityConflictMessage(entityType), confirmOptions)
                        } else if (response.status == 204) {
                            dispatch(toastrActions.clean())
                            dispatch(receiveServerEntityDeletedAckFn(entityId))
                            dispatch(goBack())
                            toastr.success(entityDeletedMessage(entityType), toastConfigSuccess())
                        } else if (!response.ok) {
                            toastr.clean()
                            toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                        }
                    }
                })
                .catch(error => {
                    dispatch(apiRequestDone())
                    toastr.clean()
                    toastr.error(entityDeleteFailedMessage(entityType), toastConfigError())
                })
        }
    }
}
