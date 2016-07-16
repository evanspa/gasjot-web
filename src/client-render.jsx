import React from "react"
import { render } from "react-dom"
import { browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from "./store/configure-store"
import RootPage from "./containers/root-page.jsx"
import * as acs from "./actions/action-creators"

let storeResult
if (process.env.NODE_ENV == 'production') {
    storeResult = configureStore(browserHistory)
} else {
    storeResult = configureStore(hashHistory)
}
const [store, load] = storeResult
load(store)
    .then((loadedState) => {
        store.dispatch(acs.receiveAuthenticationToken(loadedState.authToken))
        store.dispatch(acs.receiveUserUri(loadedState.userUri))
        store.dispatch(acs.receiveServerSnapshot(loadedState.serverSnapshot))
        let history
        if (process.env.NODE_ENV == 'production') {
            history = syncHistoryWithStore(browserHistory, store)
        } else {
            history = syncHistoryWithStore(hashHistory, store)
        }
        render(
            <RootPage store={store} history={history} />,
            document.getElementById("app")
        )
    })
