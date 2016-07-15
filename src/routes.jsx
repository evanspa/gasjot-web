import "babel-polyfill"
import React from "react"
import { Route, IndexRoute } from "react-router"
import App from "./containers/app.jsx"
import HomePage from "./containers/home-page.jsx"
import AuthHomePage from "./containers/authenticated-home-page.jsx"
import UnauthHomePage from "./containers/unauthenticated-home-page.jsx"
import VehiclesPage from "./containers/vehicles-page.jsx"
import VehicleDetailPage from "./containers/vehicle-detail-page.jsx"
import UserAccountPage from "./containers/user-account-page.jsx"
import UserAccountEditPage from "./containers/user-account-edit-page.jsx"
import VehicleEditPage from "./containers/vehicle-edit-page.jsx"
import VehicleAddPage from "./containers/vehicle-add-page.jsx"
import FuelstationsPage from "./containers/fuelstations-page.jsx"
import FuelstationDetailPage from "./containers/fuelstation-detail-page.jsx"
import FuelstationEditPage from "./containers/fuelstation-edit-page.jsx"
import FuelstationAddPage from "./containers/fuelstation-add-page.jsx"
import OdometerLogsPage from "./containers/odometer-logs-page.jsx"
import OdometerLogDetailPage from "./containers/odometer-log-detail-page.jsx"
import OdometerLogEditPage from "./containers/odometer-log-edit-page.jsx"
import OdometerLogAddPage from "./containers/odometer-log-add-page.jsx"
import GasLogsPage from "./containers/gas-logs-page.jsx"
import GasLogDetailPage from "./containers/gas-log-detail-page.jsx"
import GasLogEditPage from "./containers/gas-log-edit-page.jsx"
import GasLogAddPage from "./containers/gas-log-add-page.jsx"
import LoggedOutPage from "./containers/logged-out-page.jsx"
import NotFoundPage from "./containers/not-found-page.jsx"
import LoginPage from "./containers/login-page.jsx"
import SupportPage from "./containers/support-page.jsx"
import ForgotPasswordPage from "./containers/forgot-password-page.jsx"
import PasswordResetEmailSentPage from "./containers/password-reset-email-sent-page.jsx"
import ResetPasswordPage from "./containers/reset-password-page.jsx"
import ResetPasswordSuccessPage from "./containers/reset-password-success-page.jsx"
import RedirectPage from "./containers/redirect-page.jsx"
import SignUpPage from "./containers/sign-up-page.jsx"
import SettingsPage from "./containers/settings-page.jsx"
import RecordsPage from "./containers/records-page.jsx"
import AccountCreatedPage from "./containers/account-created-page.jsx"
import AccountVerifiedPage from "./containers/account-verified-page.jsx"
import PasswordResetPrepareErrorPage from "./containers/password-reset-prepare-error-page.jsx"
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

    function interstitialAuthCheck(nextState, replace) {
        const state = store.getState()
        if (isServer && !_.isEmpty(state.authToken)) {
            replace({
                pathname: urls.REDIRECT_URI + "?nextPathname=" + nextState.location.pathname,
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    return (
        <Route path={urls.ROOT_URI} component={App}>
            <IndexRoute                                         component={HomePage}              onEnter={interstitialAuthCheck} />
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
            <Route path={urls.SUPPORT_URI}                      component={SupportPage} />
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
