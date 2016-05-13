import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import createRoutes from "../Routes.jsx"

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    console.log("inside Root.render, store.getState(): " + JSON.stringify(store.getState()))
    return (
      <Provider store={store}>
        <Router history={history} routes={createRoutes(store)} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
