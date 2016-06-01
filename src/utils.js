import _ from "lodash"

export const cannotBeEmptyValidator = (values, errors, fieldName) => {
    if (values[fieldName] != null && _.isEmpty(_.trim(values[fieldName]))) {
        errors[fieldName] = "Cannot be empty."
    }
}

export const mustBeNumberValidator = (values, errors, fieldName) => {
    if (values[fieldName] != null) {
        const trimmedValue = _.trim(values[fieldName])
        if (!_.isEmpty(trimmedValue) && isNaN(Number(trimmedValue))) {
            errors[fieldName] = "Must be a number."
        }
    }
}
