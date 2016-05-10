import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
//import vehicles from '../reducers/vehiclesReducer'
//import fuelstations from '../reducers/fuelstationsReducer'
//import fplogs from '../reducers/fplogsReducer'
//import envlogs from '../reducers/envlogsReducer'
import userInterface from "../reducers/userInterfaceReducer"
import { SERVER_SNAPSHOT_RECEIVED } from "../actions/actionTypes"
import { AUTH_TOKEN_RECEIVED } from "../actions/actionTypes"
import { USER_URI_RECEIVED } from "../actions/actionTypes"
import { LOGOUT_REQUEST_SUCCESSFUL } from "../actions/actionTypes"

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
    serverSnapshot: initialServerSnapshotState
}

const serverSnapshotReducer = (state = {}, action) => {
    //console.log("inside serverSnapshot reducer, action.type: " + action.type)
    //console.log("inside serverSnapshot reducer, action.serverSnapshot: " + action.serverSnapshot)
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
    serverSnapshot: serverSnapshotReducer,
    routing: routerReducer
})

export default function configureStore(history) {
    const middleware = routerMiddleware(history)
    return createStore(rootReducer,
        initialState,
        applyMiddleware(thunk, middleware)
    )
}
