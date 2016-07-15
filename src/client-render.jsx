import React from "react"
import { render } from "react-dom"
import { browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from "./store/configure-store"
import RootPage from "./containers/root-page.jsx"
import * as acs from "./actions/action-creators"

const [store, load] = configureStore(hashHistory)
//const [store, load] = configureStore(browserHistory)

load(store)
    .then((loadedState) => {
        store.dispatch(acs.receiveAuthenticationToken(loadedState.authToken))
        store.dispatch(acs.receiveUserUri(loadedState.userUri))
        store.dispatch(acs.receiveServerSnapshot(loadedState.serverSnapshot))

        const history = syncHistoryWithStore(hashHistory, store)
        //const history = syncHistoryWithStore(browserHistory, store)
        render(
            <RootPage store={store} history={history} />,
            document.getElementById("app")
        )
    })
