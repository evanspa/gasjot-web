import * as actionTypes from "../actions/actionTypes"
import _ from "lodash"

export const initialServerSnapshotState = {
    _links: {},
    _embedded: {
        vehicles: {},
        fuelstations: {},
        fplogs: {},
        envlogs: {}
    }
}

export const initialApiState = {
    responseStatus: null,
    requestInProgress: false
}

export const apiReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.RESPONSE_STATUS_RECEIVED:
        return Object.assign({}, state, {responseStatus: action.responseStatus})
    case actionTypes.LOGOUT_REQUEST_DONE:
        return initialApiState
    case actionTypes.API_REQUEST_INITIATED:
        return Object.assign({}, state, {requestInProgress: true})
    case actionTypes.API_REQUEST_DONE:
        return Object.assign({}, state, {requestInProgress: false})
    }
    return state
}

export const serverSnapshotReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.SERVER_SNAPSHOT_RECEIVED:
        return _.isEmpty(action.serverSnapshot) ? state : action.serverSnapshot;
    case actionTypes.LOGOUT_REQUEST_DONE:
        return initialServerSnapshotState
    case actionTypes.SERVER_VEHICLE_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.vehicles[" + action.serverVehicle["fpvehicle/id"] + "].payload", action.serverVehicle)
    }
    return state;
}

export const authTokenReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.AUTH_TOKEN_RECEIVED:
        return _.isEmpty(action.authToken) ? state : action.authToken
    case actionTypes.LOGOUT_REQUEST_DONE:
        return null
    }
    return state;
}

export const entityIdInContextReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.SAVE_ENTITY_REQUEST_INITIATED:
        return action.entityId
    }
    return state
}
