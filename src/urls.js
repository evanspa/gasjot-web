export const ROOT_URI             = "/"

export const VEHICLES_URI         = "/vehicles"
export const ADD_VEHICLE_URI      = "/addVehicle"

export const FUELSTATIONS_URI     = "/fuelstations"
export const ADD_FUELSTATION_URI  = "/addFuelstation"

export const ODOMETER_LOGS_URI    = "/odometerLogs"
export const ADD_ODOMETER_LOG_URI = "/addOdometerLog"

export const GAS_LOGS_URI         = "/gasLogs"
export const ADD_GAS_LOG_URI      = "/addGasLog"

export const ACCOUNT_URI          = "/account"
export const EDIT_ACCOUNT_URI     = ACCOUNT_URI + "/edit"

export const LOGIN_URI            = "/login"
export const SIGNUP_URI           = "/signup"
export const FORGOT_PASSWORD_URI  = "/forgot-password"
export const WELCOME_URI          = "/welcome"
export const LOGGED_OUT_URI       = "/loggedOut"
export const ACCOUNT_CREATED_URI  = "/accountCreated"
export const REDIRECT_URI         = "/redirect"

export function vehicleDetailUrl(vehicleId) {
    return VEHICLES_URI + "/" + vehicleId
}

export function vehicleDetailTemplateUrl() {
    return vehicleDetailUrl(":vehicleId")
}

export function vehicleEditTemplateUrl() {
    return vehicleDetailTemplateUrl() + "/edit"
}

export function vehicleEditUrl(vehicleId) {
    return vehicleDetailUrl(vehicleId) + "/edit"
}

export function fuelstationDetailUrl(fuelstationId) {
    return FUELSTATIONS_URI + "/" + fuelstationId
}

export function fuelstationEditUrl(fuelstationId) {
    return fuelstationDetailUrl(fuelstationId) + "/edit"
}

export function fuelstationDetailTemplateUrl() {
    return fuelstationDetailUrl(":fuelstationId")
}

export function fuelstationEditTemplateUrl() {
    return fuelstationDetailTemplateUrl() + "/edit"
}

export function odometerLogDetailUrl(odometerLogId) {
    return ODOMETER_LOGS_URI + "/" + odometerLogId
}

export function odometerLogEditUrl(odometerLogId) {
    return odometerLogDetailUrl(odometerLogId) + "/edit"
}

export function odometerLogDetailTemplateUrl() {
    return odometerLogDetailUrl(":odometerLogId")
}

export function odometerLogEditTemplateUrl() {
    return odometerLogDetailTemplateUrl() + "/edit"
}

export function gasLogDetailUrl(gasLogId) {
    return GAS_LOGS_URI + "/" + gasLogId
}

export function gasLogEditUrl(gasLogId) {
    return gasLogDetailUrl(gasLogId) + "/edit"
}

export function gasLogDetailTemplateUrl() {
    return gasLogDetailUrl(":gasLogId")
}

export function gasLogEditTemplateUrl() {
    return gasLogDetailTemplateUrl() + "/edit"
}
