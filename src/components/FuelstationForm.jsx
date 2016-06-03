import React from "react"
import { Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import { GasJotTextFormGroup,
         GasJotCheckboxFormGroup,
         GasJotDropdownFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, mustBeNumberValidator } from "../utils"
import { FSTYPES_ARRAY } from "../fstypes"
import _ from "lodash"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "name")
    mustBeNumberValidator(values, errors, "longitude")
    mustBeNumberValidator(values, errors, "latitude")
    return errors
}

class FuelstationForm extends React.Component {
    render() {
        // https://github.com/erikras/redux-form/issues/190
        const { fields: {name, typeId, street, city, state, zip, latitude, longitude},
                fuelstationPayload,
                markFuelstationForEdit,
                cancelFuelstationEdit,
                handleSubmit,
                requestInProgress,
                editMode } = this.props
        const anyErrors = (name.error != null)
        let cancelButton = null
        let saveButton = null
        let editButton = null
        let actionArray
        if (editMode) {
            cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={() => cancelFuelstationEdit(fuelstationPayload['fpfuelstation/id'])} disabled={requestInProgress}>Cancel</Button>
            saveButton = <Button type="submit" style={{marginBottom: 0}} bsStyle="success" disabled={requestInProgress || anyErrors}>Save</Button>
            actionArray = <div>{cancelButton}{saveButton}</div>
        } else {
            editButton = <Button bsStyle="primary" onClick={() => markFuelstationForEdit(fuelstationPayload['fpfuelstation/id'])}>Edit</Button>
            actionArray = editButton
        }
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    { actionArray }
                    <Row><Col xs={12}><hr /></Col></Row>
                    <GasJotTextFormGroup
                        label="Gas station name"
                        defaultValue={fuelstationPayload['fpfuelstation/name']}
                        field={name}
                        disabled={!editMode}
                        autoFocus={true} />
                    <GasJotDropdownFormGroup
                        label="Brand"
                        defaultValue={fuelstationPayload['fpfuelstation/type-id']}
                        field={typeId}
                        disabled={!editMode}
                        valueField="id"
                        textField="label"
                        data={FSTYPES_ARRAY} />
                    <GasJotTextFormGroup
                        label="Street name"
                        defaultValue={fuelstationPayload['fpfuelstation/street']}
                        field={street}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="City"
                        defaultValue={fuelstationPayload['fpfuelstation/city']}
                        field={city}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="State"
                        defaultValue={fuelstationPayload['fpfuelstation/state']}
                        field={state}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Zip"
                        defaultValue={fuelstationPayload['fpfuelstation/zip']}
                        field={zip}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Latitude"
                        defaultValue={fuelstationPayload['fpfuelstation/latitude']}
                        field={latitude}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Longitude"
                        defaultValue={fuelstationPayload['fpfuelstation/longitude']}
                        field={longitude}
                        disabled={!editMode} />
                    <Row><Col xs={12}><hr /></Col></Row>
                    { actionArray }
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "fuelstationEdit",
    fields: ["name", "typeId", "street", "city", "state", "zip", "latitude", "longitude"],
    validate
})(FuelstationForm)
