import "babel-polyfill"
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
import OdometerLogAddPage from "./containers/OdometerLogAddPage.jsx"
import GasLogsPage from "./containers/GasLogsPage.jsx"
import GasLogDetailPage from "./containers/GasLogDetailPage.jsx"
import GasLogEditPage from "./containers/GasLogEditPage.jsx"
import GasLogAddPage from "./containers/GasLogAddPage.jsx"
import LoggedOutPage from "./containers/loggedoutpage.jsx"
import DashboardPage from "./containers/DashboardPage.jsx"
import NotFoundPage from "./containers/NotFoundPage.jsx"
import LoginPage from "./containers/LoginPage.jsx"
import ForgotPasswordPage from "./containers/ForgotPasswordPage.jsx"
import PasswordResetEmailSentPage from "./containers/PasswordResetEmailSentPage.jsx"
import ResetPasswordPage from "./containers/ResetPasswordPage.jsx"
import ResetPasswordSuccessPage from "./containers/ResetPasswordSuccessPage.jsx"
import RedirectPage from "./containers/RedirectPage.jsx"
import SignUpPage from "./containers/SignUpPage.jsx"
import SettingsPage from "./containers/SettingsPage.jsx"
import RecordsPage from "./containers/RecordsPage.jsx"
import AccountCreatedPage from "./containers/AccountCreatedPage.jsx"
import AccountVerifiedPage from "./containers/AccountVerifiedPage.jsx"
import PasswordResetPrepareErrorPage from "./containers/PasswordResetPrepareErrorPage.jsx"
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
                pathname: urls.REDIRECT_URI + "?nextPathname=" + nextState.location.pathname,
                state: { nextPathname: nextState.location.pathname }
            })
        }
        return true;
    }

    return (
        <Route path={urls.ROOT_URI} component={App}>
            <IndexRoute component={HomePage} />
            <Route path="/dashboard"                            component={DashboardPage}         onEnter={requiresAuthentication} />
            <Route path={urls.SETTINGS_URI}                     component={SettingsPage}          onEnter={requiresAuthentication} />
            <Route path={urls.RECORDS_URI}                      component={RecordsPage}           onEnter={requiresAuthentication} />
            <Route path={urls.ACCOUNT_URI}                      component={UserAccountPage}       onEnter={requiresAuthentication} />
            <Route path={urls.EDIT_ACCOUNT_URI}                 component={UserAccountEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.VEHICLES_URI}                     component={VehiclesPage}          onEnter={requiresAuthentication} />
            <Route path={urls.vehicleDetailTemplateUrl()}       component={VehicleDetailPage}     onEnter={requiresAuthentication} />
            <Route path={urls.vehicleEditTemplateUrl()}         component={VehicleEditPage}       onEnter={requiresAuthentication} />
            <Route path={urls.ADD_VEHICLE_URI}                  component={VehicleAddPage}        onEnter={requiresAuthentication} />
            <Route path={urls.FUELSTATIONS_URI}                 component={FuelstationsPage}      onEnter={requiresAuthentication} />
            <Route path={urls.fuelstationDetailTemplateUrl()}   component={FuelstationDetailPage} onEnter={requiresAuthentication} />
            <Route path={urls.fuelstationEditTemplateUrl()}     component={FuelstationEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.ADD_FUELSTATION_URI}              component={FuelstationAddPage}    onEnter={requiresAuthentication} />
            <Route path={urls.ODOMETER_LOGS_URI}                component={OdometerLogsPage}      onEnter={requiresAuthentication} />
            <Route path={urls.odometerLogDetailTemplateUrl()}   component={OdometerLogDetailPage} onEnter={requiresAuthentication} />
            <Route path={urls.odometerLogEditTemplateUrl()}     component={OdometerLogEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.ADD_ODOMETER_LOG_URI}             component={OdometerLogAddPage}    onEnter={requiresAuthentication} />
            <Route path={urls.GAS_LOGS_URI}                     component={GasLogsPage}           onEnter={requiresAuthentication} />
            <Route path={urls.gasLogDetailTemplateUrl()}        component={GasLogDetailPage}      onEnter={requiresAuthentication} />
            <Route path={urls.gasLogEditTemplateUrl()}          component={GasLogEditPage}        onEnter={requiresAuthentication} />
            <Route path={urls.ADD_GAS_LOG_URI}                  component={GasLogAddPage}         onEnter={requiresAuthentication} />
            <Route path={urls.WELCOME_URI}                      component={UnauthHomePage} />
            <Route path={urls.SIGNUP_URI}                       component={SignUpPage} />
            <Route path={urls.ACCOUNT_CREATED_URI}              component={AccountCreatedPage}    onEnter={requiresAuthentication} />
            <Route path={urls.ACCOUNT_VERIFICATION_SUCCESS_URI} component={AccountVerifiedPage} /> />
            <Route path={urls.LOGIN_URI}                        component={LoginPage} />
            <Route path={urls.FORGOT_PASSWORD_URI}              component={ForgotPasswordPage} />
            <Route path={urls.PASSWORD_RESET_EMAIL_SENT_URI}    component={PasswordResetEmailSentPage} />
            <Route path={urls.PASSWORD_RESET_URI}               component={ResetPasswordPage} />
            <Route path={urls.PASSWORD_RESET_SUCCESS_URI}       component={ResetPasswordSuccessPage} />
            <Route path={urls.LOGGED_OUT_URI}                   component={LoggedOutPage} />
            <Route path={urls.PASSWORD_RESET_PREPARE_ERROR_URI} component={PasswordResetPrepareErrorPage} />
            <Route path={urls.PASSWORD_RESET_PREPARE_ERROR_WITH_MASK_URI} component={PasswordResetPrepareErrorPage} />
            <Route path={urls.REDIRECT_URI}                     component={RedirectPage} />
            <Route path="*"                                     component={NotFoundPage} />
        </Route>
    )
}
