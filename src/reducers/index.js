import {reducer as toastrReducer} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import {
    authTokenReducer,
    apiReducer,
    serverSnapshotReducer,
    gasjotFormReducer,
    mostRecentUpdatedAtReducer
} from "./Reducers"
import * as actionTypes from "../actions/actionTypes"
import { reducer as formReducer } from "redux-form"
import _ from "lodash"

const userUriReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.USER_URI_RECEIVED:
        return _.isEmpty(action.userUri) ? state : action.userUri
    case actionTypes.LOGOUT_REQUEST_DONE:
        return null
    }
    return state
}

const becameUnauthenticatedReducer = (state = false, action) => {
    switch (action.type) {
    case actionTypes.BECAME_UNAUTHENTICATED:
        return true
    case actionTypes.BECAME_REAUTHENTICATED:
    case actionTypes.LOGOUT_REQUEST_DONE:
        return false
    }
    return state
}

export const rootReducer = combineReducers({
    toastr: toastrReducer,
    authToken: authTokenReducer,
    userUri: userUriReducer,
    becameUnauthenticated: becameUnauthenticatedReducer,
    api: apiReducer,
    serverSnapshot: serverSnapshotReducer,
    routing: routerReducer,
    form: gasjotFormReducer,
    mostRecentUpdatedAt: mostRecentUpdatedAtReducer
})

export default rootReducer
