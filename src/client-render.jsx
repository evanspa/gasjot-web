import React from "react"
import { render } from "react-dom"
import { browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from "./store/configureStore"

import Root from './containers/Root'


const store = configureStore(hashHistory)
//const history = syncHistoryWithStore(browserHistory, store)
const history = syncHistoryWithStore(hashHistory, store)

render(
    <Root store={store} history={history} />,
    document.getElementById("app")
)
