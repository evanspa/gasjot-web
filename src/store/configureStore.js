import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { LOCATION_CHANGE, routerReducer, routerMiddleware } from 'react-router-redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk'
import userInterface from "../reducers/userInterfaceReducer"
import * as actionTypes from "../actions/actionTypes"
import {reducer as toastrReducer} from 'react-redux-toastr'

const initialServerSnapshotState = {
    _links: {},
    _embedded: {
        vehicles: {},
        fuelstations: {},
        fplogs: {},
        envlogs: {}
    }
}

const initialState = {
    userInterface: {},
    authToken: null,
    userUri: null,
    api: {},
    serverSnapshot: initialServerSnapshotState
}

const apiReducer = (state = {}, action) => {
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

const serverSnapshotReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SERVER_SNAPSHOT_RECEIVED:
            return action.serverSnapshot;
        case actionTypes.LOGOUT_REQUEST_DONE:
            return initialServerSnapshotState
    }
    return state;
}

const authTokenReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.AUTH_TOKEN_RECEIVED:
            return action.authToken
        case actionTypes.LOGOUT_REQUEST_DONE:
            return null
    }
    return state;
}

const userUri = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.USER_URI_RECEIVED:
            return action.userUri
        case actionTypes.LOGOUT_REQUEST_DONE:
            return null
    }
    return state;
}

const rootReducer = combineReducers({
    toastr: toastrReducer,
    userInterface,
    authToken: authTokenReducer,
    userUri,
    api: apiReducer,
    serverSnapshot: serverSnapshotReducer,
    routing: routerReducer
})

export default function configureStore(history) {
    const engine = createEngine('gasjot');
    const storageMiddleware = storage.createMiddleware(engine, [ LOCATION_CHANGE ]);
    const store = compose(
        applyMiddleware(thunk, routerMiddleware(history), storageMiddleware)
    )(createStore)(
        rootReducer,
        initialState
    )
    const load = storage.createLoader(engine)
    return [store, load]
}