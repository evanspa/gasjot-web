export const VEHICLES_URI     = "/vehicles"
export const FUELSTATIONS_URI = "/fuelstations"


export function vehicleDetailUrl(vehicleId) {
    return VEHICLES_URI + "/" + vehicleId
}

export function vehicleDetailTemplateUrl() {
    return vehicleDetailUrl(":vehicleId")
}

export function vehicleEditTemplateUrl() {
    return vehicleDetailUrl(":vehicleId/edit")
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
