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
    fpErrorMask: null,
    requestInProgress: false
}

export const apiReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.RESPONSE_STATUS_RECEIVED:
        return Object.assign({}, state, { responseStatus: action.responseStatus,
                                          fpErrorMask: action.fpErrorMask })
    case actionTypes.LOGOUT_REQUEST_DONE:
        return initialApiState
    case actionTypes.API_REQUEST_INITIATED:
        return Object.assign({}, state, {requestInProgress: true})
    case actionTypes.API_REQUEST_DONE:
        return Object.assign({}, state, {requestInProgress: false})
    case actionTypes.BECAME_UNAUTHENTICATED:
        return Object.assign({}, state, { responseStatus: null })
    }
    return state
}

export const serverSnapshotReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.SERVER_SNAPSHOT_RECEIVED:
        return _.isEmpty(action.serverSnapshot) ? state : action.serverSnapshot;
    case actionTypes.LOGOUT_REQUEST_DONE:
        return initialServerSnapshotState
    case actionTypes.SERVER_USER_RECEIVED:
        return Object.assign(Object.assign({}, state), action.serverUser)
    case actionTypes.SERVER_VEHICLE_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.vehicles[" + action.serverVehicle["fpvehicle/id"] + "].payload", action.serverVehicle)
    case actionTypes.SERVER_VEHICLE_LOCATION_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.vehicles[" + action.serverVehicleId + "].location", action.serverVehicleLocation)
    case actionTypes.SERVER_VEHICLE_MEDIATYPE_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.vehicles[" + action.serverVehicleId + "].media-type", action.serverVehicleMediaType)
    case actionTypes.SERVER_FUELSTATION_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fuelstations[" + action.serverFuelstation["fpfuelstation/id"] + "].payload", action.serverFuelstation)
    }
    return state;
}

export const authTokenReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.AUTH_TOKEN_RECEIVED:
        return _.isEmpty(action.authToken) ? state : action.authToken
    case actionTypes.LOGOUT_REQUEST_DONE:
    case actionTypes.BECAME_UNAUTHENTICATED:
        return null
    }
    return state;
}
