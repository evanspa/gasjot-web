import React from "react"
import { render } from "react-dom"
import { Router, browserHistory, hashHistory } from "react-router"
import routes from "./routes.jsx"

render(<Router history={hashHistory} routes={routes} />,
       document.getElementById('app'));
