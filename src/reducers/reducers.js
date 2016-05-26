import * as actionTypes from "../actions/actionTypes"

export const initialServerSnapshotState = {
    _links: {},
    _embedded: {
        vehicles: {},
        fuelstations: {},
        fplogs: {},
        envlogs: {}
    }
}

export const apiReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RESPONSE_STATUS_RECEIVED:
            return Object.assign({}, state, {
                responseStatus: action.responseStatus,
                requestInProgressMessage: null
            })
        case actionTypes.LOGOUT_REQUEST_DONE:
            return {}
        case actionTypes.LOGOUT_REQUEST_INITIATED:
            return Object.assign({}, state, {
                requestInProgressMessage: "Logging you out..."
            })
        case actionTypes.LOGIN_REQUEST_INITIATED:
            return Object.assign({}, state, {
                requestInProgressMessage: "Logging you in..."
            })
    }
    return state
}

export const serverSnapshotReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SERVER_SNAPSHOT_RECEIVED:
            return action.serverSnapshot;
        case actionTypes.LOGOUT_REQUEST_DONE:
            return initialServerSnapshotState
    }
    return state;
}

export const authTokenReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.AUTH_TOKEN_RECEIVED:
            return action.authToken
        case actionTypes.LOGOUT_REQUEST_DONE:
            return null
    }
    return state;
}

