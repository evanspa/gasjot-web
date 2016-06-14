import _ from "lodash"

export function makeLoginHandler(location, handleSubmit) {
    var nextSuccessPathname = "/";
    if (location.state && location.state.nextPathname) {
        nextSuccessPathname = location.state.nextPathname
    }
    return function() { handleSubmit(nextSuccessPathname) }
}

export const cannotBeEmptyValidator = (values, errors, fieldName) => {
    if (!values[fieldName] || _.isEmpty(_.trim(values[fieldName]))) {
        errors[fieldName] = "Cannot be empty."
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
        if (form[formKey].touched) {
            let formValue
            if (tailKey != null) {
                formValue = form[formKey].value[tailKey]
            } else {
                formValue = form[formKey].value
            }
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
