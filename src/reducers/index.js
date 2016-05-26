import {reducer as toastrReducer} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import {authTokenReducer, apiReducer, serverSnapshotReducer} from "./Reducers"
import * as actionTypes from "../actions/actionTypes"

const userUri = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.USER_URI_RECEIVED:
            return action.userUri
        case actionTypes.LOGOUT_REQUEST_DONE:
            return null
    }
    return state;
}

export const rootReducer = combineReducers({
    toastr: toastrReducer,
    authToken: authTokenReducer,
    userUri,
    api: apiReducer,
    serverSnapshot: serverSnapshotReducer,
    routing: routerReducer
})

export default rootReducer