import React from "react"
import { Route, IndexRoute } from "react-router"
import App from "./containers/App.jsx"
import HomePage from "./containers/HomePage.jsx"
import AuthHomePage from "./containers/AuthenticatedHomePage.jsx"
import UnauthHomePage from "./containers/UnauthenticatedHomePage.jsx"
import VehiclesPage from "./containers/VehiclesPage.jsx"
import VehicleDetailPage from "./containers/VehicleDetailPage.jsx"
import UserAccountPage from "./containers/UserAccountPage.jsx"
import UserAccountEditPage from "./containers/UserAccountEditPage.jsx"
import VehicleEditPage from "./containers/VehicleEditPage.jsx"
import VehicleAddPage from "./containers/VehicleAddPage.jsx"
import FuelstationsPage from "./containers/FuelstationsPage.jsx"
import FuelstationDetailPage from "./containers/FuelstationDetailPage.jsx"
import FuelstationEditPage from "./containers/FuelstationEditPage.jsx"
import FuelstationAddPage from "./containers/FuelstationAddPage.jsx"
import OdometerLogsPage from "./containers/OdometerLogsPage.jsx"
import OdometerLogDetailPage from "./containers/OdometerLogDetailPage.jsx"
import OdometerLogEditPage from "./containers/OdometerLogEditPage.jsx"
import LoggedOutPage from "./containers/LoggedOutPage.jsx"
import DashboardPage from "./containers/DashboardPage.jsx"
import NotFoundPage from "./containers/NotFoundPage.jsx"
import LoginPage from "./containers/LoginPage.jsx"
import RedirectPage from "./containers/RedirectPage.jsx"
import SignUpPage from "./containers/SignUpPage.jsx"
//import SettingsPage from "./containers/SettingsPage.jsx"
import AccountCreatedPage from "./containers/AccountCreatedPage.jsx"
import _ from "lodash"
import * as urls from "./urls"

export default function createRoutes(store, isServer) {

    function requiresAuthentication(nextState, replace) {
        const state = store.getState()
        if (!isServer && _.isEmpty(state.authToken)) {
            replace({
                pathname: urls.LOGIN_URI,
                state: { nextPathname: nextState.location.pathname }
            })
        } else if (isServer) {
            replace({
                pathname: "/redirect?nextPathname=" + nextState.location.pathname,
                state: { nextPathname: nextState.location.pathname }
            })
        }
        return true;
    }

    return (
        <Route path={urls.ROOT_URI} component={App}>
            <IndexRoute component={HomePage} />
            <Route path="/dashboard"                          component={DashboardPage}         onEnter={requiresAuthentication} />
            {/*<Route path="/settings" component={SettingsPage} onEnter={requiresAuthentication} />*/}
            <Route path={urls.ACCOUNT_URI}                    component={UserAccountPage}       onEnter={requiresAuthentication} />
            <Route path={urls.EDIT_ACCOUNT_URI}               component={UserAccountEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.VEHICLES_URI}                   component={VehiclesPage}          onEnter={requiresAuthentication} />
            <Route path={urls.vehicleDetailTemplateUrl()}     component={VehicleDetailPage}     onEnter={requiresAuthentication} />
            <Route path={urls.vehicleEditTemplateUrl()}       component={VehicleEditPage}       onEnter={requiresAuthentication} />
            <Route path={urls.ADD_VEHICLE_URI}                component={VehicleAddPage}        onEnter={requiresAuthentication} />
            <Route path={urls.FUELSTATIONS_URI}               component={FuelstationsPage}      onEnter={requiresAuthentication} />
            <Route path={urls.fuelstationDetailTemplateUrl()} component={FuelstationDetailPage} onEnter={requiresAuthentication} />
            <Route path={urls.fuelstationEditTemplateUrl()}   component={FuelstationEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.ADD_FUELSTATION_URI}            component={FuelstationAddPage}    onEnter={requiresAuthentication} />
            <Route path={urls.ODOMETER_LOGS_URI}              component={OdometerLogsPage}      onEnter={requiresAuthentication} />
            <Route path={urls.odometerLogDetailTemplateUrl()} component={OdometerLogDetailPage} onEnter={requiresAuthentication} />
            <Route path={urls.odometerLogEditTemplateUrl()}   component={OdometerLogEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.WELCOME_URI}                    component={UnauthHomePage} />
            <Route path={urls.SIGNUP_URI}                     component={SignUpPage} />
            <Route path={urls.ACCOUNT_CREATED_URI}            component={AccountCreatedPage}    onEnter={requiresAuthentication} />
            <Route path={urls.LOGIN_URI}                      component={LoginPage} />
            <Route path={urls.LOGGED_OUT_URI}                 component={LoggedOutPage} />
            <Route path={urls.REDIRECT_URI}                   component={RedirectPage} />
            <Route path="*"                                   component={NotFoundPage} />
        </Route>
    )
}
