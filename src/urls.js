export const ROOT_URI            = "/"
export const VEHICLES_URI        = "/vehicles"
export const FUELSTATIONS_URI    = "/fuelstations"
export const ODOMETER_LOGS_URI   = "/odometerLogs"
export const LOGIN_URI           = "/login"
export const SIGNUP_URI          = "/signup"
export const WELCOME_URI         = "/welcome"
export const ACCOUNT_URI         = "/account"
export const EDIT_ACCOUNT_URI    = ACCOUNT_URI + "/edit"
export const LOGGED_OUT_URI      = "/loggedOut"
export const ACCOUNT_CREATED_URI = "/accountCreated"
export const REDIRECT_URI        = "/redirect"
export const ADD_VEHICLE_URI     = "/addVehicle"
export const ADD_FUELSTATION_URI = "/addFuelstation"

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
