import "intl"
import "intl/locale-data/jsonp/en.js"
import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import {IntlProvider} from 'react-intl';
import createRoutes from "../Routes.jsx"
import ReduxToastr from 'react-redux-toastr'

export default class Root extends Component {
    render() {
        const { store, history } = this.props
        return (
            <Provider store={store}>
                <IntlProvider locale="en">
                    <div>
                        <Router history={history} routes={createRoutes(store, false)} />
                        <ReduxToastr position="top-left" />
                    </div>
                </IntlProvider>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}
