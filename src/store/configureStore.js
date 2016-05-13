import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { LOCATION_CHANGE, routerReducer, routerMiddleware } from 'react-router-redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk'
import userInterface from "../reducers/userInterfaceReducer"
import { SERVER_SNAPSHOT_RECEIVED } from "../actions/actionTypes"
import { AUTH_TOKEN_RECEIVED } from "../actions/actionTypes"
import { USER_URI_RECEIVED } from "../actions/actionTypes"
import { LOGOUT_REQUEST_SUCCESSFUL } from "../actions/actionTypes"
import { RESPONSE_STATUS_RECEIVED } from "../actions/actionTypes"

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
        case RESPONSE_STATUS_RECEIVED:
            return Object.assign({}, state, { responseStatus: action.responseStatus})
        case LOGOUT_REQUEST_SUCCESSFUL:
            return {}
    }
    return state
}

const serverSnapshotReducer = (state = {}, action) => {
    switch (action.type) {
        case SERVER_SNAPSHOT_RECEIVED:
            return action.serverSnapshot;
        case LOGOUT_REQUEST_SUCCESSFUL:
            return initialServerSnapshotState
    }
    return state;
}

const authTokenReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_TOKEN_RECEIVED:
            return action.authToken
        case LOGOUT_REQUEST_SUCCESSFUL:
            return null
    }
    return state;
}

const userUri = (state = {}, action) => {
    switch (action.type) {
        case USER_URI_RECEIVED:
            return action.userUri
        case LOGOUT_REQUEST_SUCCESSFUL:
            return null
    }
    return state;
}

const rootReducer = combineReducers({
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