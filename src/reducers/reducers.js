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
    case actionTypes.CANCEL_RECORD_EDIT:
        return Object.assign({}, state, { fpErrorMask: null })
    case actionTypes.CLEAR_ERRORS:
        return Object.assign({}, state, { fpErrorMask: null,
                                          responseStatus: null,
                                          gasLogIdNotFound: null,
                                          vehicleIdNotFound: null,
                                          odometerLogIdNotFound: null,
                                          fuelstationIdNotFound: null })
    case actionTypes.SERVER_ODOMETERLOG_NOT_FOUND:
        return Object.assign({}, state, { odometerLogIdNotFound: action.serverOdometerLogId })
    case actionTypes.SERVER_GASLOG_NOT_FOUND:
        return Object.assign({}, state, { gasLogIdNotFound: action.serverGasLogId })
    case actionTypes.SERVER_VEHICLE_NOT_FOUND:
        return Object.assign({}, state, { vehicleIdNotFound: action.serverVehicleId })
    case actionTypes.SERVER_FUELSTATION_NOT_FOUND:
        return Object.assign({}, state, { fuelstationIdNotFound: action.serverFuelstationId })
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
    case actionTypes.SERVER_VEHICLE_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_VEHICLE_NOT_FOUND_USER_ACK:
        return removeVehicle(state, action.serverVehicleId)
    case actionTypes.SERVER_FUELSTATION_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fuelstations[" + action.serverFuelstation["fpfuelstation/id"] + "].payload", action.serverFuelstation)
    case actionTypes.SERVER_FUELSTATION_LOCATION_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fuelstations[" + action.serverFuelstationId + "].location", action.serverFuelstationLocation)
    case actionTypes.SERVER_FUELSTATION_MEDIATYPE_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fuelstations[" + action.serverFuelstationId + "].media-type", action.serverFuelstationMediaType)
    case actionTypes.SERVER_FUELSTATION_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_FUELSTATION_NOT_FOUND_USER_ACK:
        return removeFuelstation(state, action.serverFuelstationId)
    case actionTypes.SERVER_ODOMETERLOG_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.envlogs[" + action.serverOdometerLog["envlog/id"] + "].payload", action.serverOdometerLog)
    case actionTypes.SERVER_ODOMETERLOG_LOCATION_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.envlogs[" + action.serverOdometerLogId + "].location", action.serverOdometerLogLocation)
    case actionTypes.SERVER_ODOMETERLOG_MEDIATYPE_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.envlogs[" + action.serverOdometerLogId + "].media-type", action.serverOdometerLogMediaType)
    case actionTypes.SERVER_ODOMETERLOG_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_ODOMETERLOG_NOT_FOUND_USER_ACK:
        return removeEntity(state, "envlogs", action.serverOdometerLogId)
    case actionTypes.SERVER_GASLOG_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fplogs[" + action.serverGasLog["fplog/id"] + "].payload", action.serverGasLog)
    case actionTypes.SERVER_GASLOG_LOCATION_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fplogs[" + action.serverGasLogId + "].location", action.serverGasLogLocation)
    case actionTypes.SERVER_GASLOG_MEDIATYPE_RECEIVED:
        return _.set(Object.assign({}, state), "_embedded.fplogs[" + action.serverGasLogId + "].media-type", action.serverGasLogMediaType)
    case actionTypes.SERVER_GASLOG_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_GASLOG_NOT_FOUND_USER_ACK:
        return removeEntity(state, "fplogs", action.serverGasLogId)
    }
    return state;
}

function removeFuelstation(state, fuelstationId) {
    let newState = removeEntity(state, "fuelstations", fuelstationId) // remove gas station
    removeDependents(newState, "fplogs", "fplog/fuelstation-id", fuelstationId)
    return newState
}

function removeVehicle(state, vehicleId) {
    let newState = removeEntity(state, "vehicles", vehicleId) // remove vehicle
    removeDependents(newState, "envlogs", "envlog/vehicle-id", vehicleId)
    removeDependents(newState, "fplogs", "fplog/vehicle-id", vehicleId)
    return newState
}

function removeDependents(newState, childrenKey, parentIdKey, parentId) {
    let children = newState._embedded[childrenKey]
    let childrenIds = _.keys(children)
    for (let i = 0; i < childrenIds.length; i++) {
        if (children[childrenIds[i]].payload[parentIdKey] == parentId) {
            _.unset(children, childrenIds[i])
        }
    }
}

function removeEntity(state, entitiesKey, entityId) {
    return removeEntry(state, ["_embedded", entitiesKey, _.toString(entityId)])
}

function removeEntry(state, path) {
    let newState = _.cloneDeep(state)
    _.unset(newState, path)
    return newState
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
