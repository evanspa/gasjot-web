import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import createRoutes from "../Routes.jsx"
import ReduxToastr from 'react-redux-toastr'

export default class Root extends Component {
    render() {
        const { store, history } = this.props
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={createRoutes(store)} />
                    <ReduxToastr position="top-left" />
                </div>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}
