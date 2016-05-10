import React from "react"
import { Route, IndexRoute } from "react-router"
import App from "./containers/App.jsx"
import AuthHomePage from "./containers/AuthenticatedHomePage.jsx"
import UnauthHomePage from "./containers/UnauthenticatedHomePage.jsx"
import LoggedOutPage from "./containers/LoggedOutPage.jsx"
import DashboardPage from "./containers/DashboardPage.jsx"
import NotFoundPage from "./containers/NotFoundPage.jsx"
import LoginPage from "./containers/LoginPage.jsx"
import SignUpPage from "./containers/SignUpPage.jsx"
import _ from "lodash"

export default function createRoutes(store) {

    function requiresAuthentication(nextState, replace) {
        const state = store.getState()
        if (_.isEmpty(state.authToken)) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            })
        }
        return true;
    }

    const state = store.getState();

    return (
        <Route path="/" component={App}>
            <IndexRoute component={ _.isEmpty(state.authToken) ? UnauthHomePage : AuthHomePage } />
            <Route path="/dashboard" component={DashboardPage} onEnter={requiresAuthentication} />
            <Route path="/welcome" component={UnauthHomePage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LoggedOutPage} />
            <Route path="*" component={NotFoundPage} />
        </Route>
    )
}