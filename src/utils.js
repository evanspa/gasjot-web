import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"

String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
              'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
                          function(txt) {
                              return txt.toLowerCase();
                          });
    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
                          uppers[i].toUpperCase());
    return str;
}

export const DATE_DISPLAY_FORMAT = "dddd, MMMM Do YYYY"
export const DATE_EDIT_FORMAT    = "MM/DD/YYYY"

export function formatDate(moment, dateAsLongSince1970) {
    return moment(dateAsLongSince1970).format(DATE_DISPLAY_FORMAT)
}

export function toMoment(moment, dateAsString) {
    return moment(dateAsString, DATE_DISPLAY_FORMAT)
}

export function toUnixEpoch(moment, dateAsString) {
    return toMoment(moment, dateAsString).valueOf()
}

export function makeLoginHandler(location, handleSubmit) {
    var nextSuccessPathname = "/";
    if (location != null && location.state && location.state.nextPathname) {
        nextSuccessPathname = location.state.nextPathname
    }
    return function() { handleSubmit(nextSuccessPathname) }
}

export const cannotBeEmptyValidator = (values, errors, fieldName) => {
    if (!values[fieldName] || _.isEmpty(_.trim(values[fieldName]))) {
        errors[fieldName] = "Cannot be empty."
    }
}

export const cannotBeUnselectedValidator = (values, errors, fieldName, errMessage) => {
    if ((values[fieldName] == null) || _.isEmpty(_.trim(values[fieldName]))) {
        errors[fieldName] = errMessage
    }
}

export const mustBeNumberValidator = (values, errors, fieldName) => {
    if (values[fieldName]) {
        const trimmedValue = _.trim(values[fieldName])
        if (!_.isEmpty(trimmedValue) && isNaN(Number(trimmedValue))) {
            errors[fieldName] = "Must be a number."
        }
    }
}

export const mustBePositiveNumberValidator = (values, errors, fieldName) => {
    if (values[fieldName]) {
        const trimmedValue = _.trim(values[fieldName])
        if (!_.isEmpty(trimmedValue) && isNaN(Number(trimmedValue))) {
            errors[fieldName] = "Must be a number."
        } else if (Number(trimmedValue) <= 0) {
            errors[fieldName] = "Must be a positive number."
        }
    }
}

export const mustBeEmailValidator = (values, errors, fieldName) => {
    if (values[fieldName]) {
        const trimmedValue = _.trim(values[fieldName])
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(trimmedValue)) {
            errors.email = 'Must be a valid email address.'
        }
    }
}

export const formToModelIfNotNull = (form, formKey, target, targetKey, tailKey = null, transformer = null) => {
    if (form[formKey].value != null) {
        if (form[formKey].touched != null && form[formKey].touched) {
            let formValue = null
            if (tailKey != null) {
                if (form[formKey].value[tailKey] != null) {
                    formValue = form[formKey].value[tailKey]
                }
            } else {
                if (form[formKey].value != null) {
                    formValue = form[formKey].value
                }
            }
            if (formValue != null) {
                if (!_.isEmpty(_.trim(formValue))) {
                    if (transformer != null) {
                        target[targetKey] = transformer(formValue)
                    } else {
                        target[targetKey] = formValue
                    }
                } else {
                    target[targetKey] = null
                }
            }
        }
    }
}

export const modelToFormModelIfNotNull = (formModel, formKey, model, modelKey, transformer = null) => {
    const val = model[modelKey]
    if (val != null) {
        if (transformer != null) {
            formModel[formKey] = transformer(val)
        } else {
            formModel[formKey] = val
        }
    }
}

export const toDropdownValues = (entities, valueKey, displayKey) => {
    let dropdownValues = []
    let values = _.values(entities)
    for (let i = 0; i < values.length; i++) {
        let dropdownValue = {}
        let payload = values[i]["payload"]
        dropdownValue[valueKey] = payload[valueKey]
        dropdownValue[displayKey] = payload[displayKey]
        dropdownValues.push(dropdownValue)
    }
    return dropdownValues
}

export const toUserFormModel = (userPayload) => {
    let formModel = {}
    const userModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, userPayload, modelKey, transformer)
    }
    userModelToFormModel("name",  "user/name")
    userModelToFormModel("email", "user/email")
    return formModel
}

export const toVehicleFormModel = (vehiclePayload) => {
    let formModel = {}
    const vehicleModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, vehiclePayload, modelKey, transformer)
    }
    vehicleModelToFormModel("name",                  "fpvehicle/name")
    vehicleModelToFormModel("plate",                 "fpvehicle/plate")
    vehicleModelToFormModel("vin",                   "fpvehicle/vin")
    vehicleModelToFormModel("fuelCapacity",          "fpvehicle/fuel-capacity")
    vehicleModelToFormModel("defaultOctane",         "fpvehicle/default-octane")
    vehicleModelToFormModel("takesDiesel",           "fpvehicle/is-diesel")
    vehicleModelToFormModel("hasMpgReadout",         "fpvehicle/has-mpg-readout")
    vehicleModelToFormModel("hasMphReadout",         "fpvehicle/has-mph-readout")
    vehicleModelToFormModel("hasDteReadout",         "fpvehicle/has-dte-readout")
    vehicleModelToFormModel("hasOutsideTempReadout", "fpvehicle/has-outside-temp-readout")
    return formModel
}

export const toFuelstationFormModel = (fuelstationPayload) => {
    let formModel = {}
    const fuelstationModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, fuelstationPayload, modelKey, transformer)
    }
    fuelstationModelToFormModel("name",      "fpfuelstation/name")
    fuelstationModelToFormModel("state",     "fpfuelstation/state")
    fuelstationModelToFormModel("longitude", "fpfuelstation/longitude")
    fuelstationModelToFormModel("latitude",  "fpfuelstation/latitude")
    fuelstationModelToFormModel("zip",       "fpfuelstation/zip")
    fuelstationModelToFormModel("typeId",    "fpfuelstation/type-id")
    fuelstationModelToFormModel("street",    "fpfuelstation/street")
    fuelstationModelToFormModel("city",      "fpfuelstation/city")
    return formModel
}

export const toOdometerLogFormModel = (odometerLogPayload) => {
    momentLocalizer(moment)
    let formModel = {}
    const odometerLogModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, odometerLogPayload, modelKey, transformer)
    }
    odometerLogModelToFormModel("vehicleId",          "envlog/vehicle-id")
    odometerLogModelToFormModel("logDate",            "envlog/logged-at", loggedAt => formatDate(moment, loggedAt))
    odometerLogModelToFormModel("odometer",           "envlog/odometer")
    odometerLogModelToFormModel("avgMpgReadout",      "envlog/reported-avg-mpg")
    odometerLogModelToFormModel("avgMphReadout",      "envlog/reported-avg-mph")
    odometerLogModelToFormModel("rangeReadout",       "envlog/dte")
    odometerLogModelToFormModel("outsideTempReadout", "envlog/reported-outside-temp")
    return formModel
}

export const toGasLogFormModel = (gasLogPayload) => {
    momentLocalizer(moment)
    let formModel = {}
    const gasLogModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, gasLogPayload, modelKey, transformer)
    }
    gasLogModelToFormModel("vehicleId",                "fplog/vehicle-id")
    gasLogModelToFormModel("fuelstationId",            "fplog/fuelstation-id")
    gasLogModelToFormModel("purchaseDate",             "fplog/purchased-at", purchasedAt => formatDate(moment, purchasedAt))
    gasLogModelToFormModel("octane",                   "fplog/octane")
    gasLogModelToFormModel("odometer",                 "fplog/odometer")
    gasLogModelToFormModel("pricePerGallon",           "fplog/gallon-price")
    gasLogModelToFormModel("gotCarWash",               "fplog/got-car-wash")
    gasLogModelToFormModel("carWashPerGallonDiscount", "fplog/car-wash-per-gal-discount")
    gasLogModelToFormModel("numGallons",               "fplog/num-gallons")
    return formModel
}

export function countDependents(state, childrenKey, parentIdKey, parentId) {
    let children = _.values(state.serverSnapshot._embedded[childrenKey])
    let numMatch = 0
    for (let i = 0; i < children.length; i++) {
        if (children[i].payload[parentIdKey] == parentId) {
            numMatch++
        }
    }
    return numMatch
}
