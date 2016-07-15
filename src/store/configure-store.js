import { createStore, applyMiddleware, compose } from 'redux'
import { LOCATION_CHANGE, routerMiddleware } from 'react-router-redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk'
import rootReducer from "../reducers/index"
import { initialServerSnapshotState, initialApiState } from "../reducers/reducers"

export const initialState = (fpAuthToken) => {
    console.log("inside initialState, fpAuthToken: [" + fpAuthToken + "]")
    return {
        authToken: fpAuthToken,
        userUri: null,
        api: initialApiState,
        serverSnapshot: initialServerSnapshotState
    }
}

export default function configureStore(history) {
    const engine = createEngine('gasjot');
    const storageMiddleware = storage.createMiddleware(engine, [ LOCATION_CHANGE ]);
    const store = compose(
        applyMiddleware(thunk, routerMiddleware(history), storageMiddleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore)(
        rootReducer,
        initialState(null)
    )
    const load = storage.createLoader(engine)
    return [store, load]
}
