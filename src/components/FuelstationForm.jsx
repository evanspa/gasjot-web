import React from "react"
import { Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import SmallModal from "./SmallModal.jsx"
import { GasJotTextFormGroup,
         GasJotCheckboxFormGroup,
         GasJotDropdownFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, cannotBeUnselectedValidator, mustBeNumberValidator } from "../utils"
import { FSTYPES_ARRAY } from "../fstypes"
import _ from "lodash"
import * as errFlags from "../errorFlags"
import ActionsArray from "./ActionsArray.jsx"
import ErrorMessages from "./ErrorMessages.jsx"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "name")
    cannotBeUnselectedValidator(values, errors, "typeId", 'Please select a value.  (pick "Other" if not sure of brand)')
    mustBeNumberValidator(values, errors, "longitude")
    mustBeNumberValidator(values, errors, "latitude")
    return errors
}

class FuelstationForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            modalTitle: null,
            modalContent: null
        };
    }

    render() {
        // https://github.com/erikras/redux-form/issues/190
        const {
            fields: {name, typeId, street, city, state, zip, latitude, longitude},
            fuelstationId,
            markFuelstationForEdit,
            cancelFuelstationEdit,
            downloadFuelstation,
            deleteFuelstation,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            fpErrorMask,
            deleteConfirmMessage
        } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={fuelstationId}
                                cancelEntityEdit={cancelFuelstationEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markFuelstationForEdit}
                                cancelEntityAdd={cancelFuelstationEdit}
                                downloadEntity={downloadFuelstation}
                                deleteEntity={deleteFuelstation}
                                deleteEntityConfirmMessage={deleteConfirmMessage} />
        const errors = [
            { flag: errFlags.SAVE_FUELSTATION_CANNOT_BE_PURPLEX,
              message: "Gas station name cannot contain 'purplex'."}
        ]
        return (
            <div>
                <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
                <ErrorMessages errorMask={fpErrorMask} errors={errors} />
                <form onSubmit={handleSubmit}>
                    { actionArray }
                    <Row><Col xs={12}><hr /></Col></Row>
                    <GasJotTextFormGroup
                        label="Gas station name"
                        field={name}
                        disabled={!editMode}
                        autoFocus={true} />
                    <GasJotDropdownFormGroup
                        label="Brand"
                        field={typeId}
                        disabled={!editMode}
                        valueField="id"
                        textField="label"
                        data={FSTYPES_ARRAY} />
                    <GasJotTextFormGroup
                        label="Street name"
                        field={street}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="City"
                        field={city}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="State"
                        field={state}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Zip"
                        field={zip}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Latitude"
                        field={latitude}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Longitude"
                        field={longitude}
                        disabled={!editMode} />
                    <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                    { actionArray }
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "fuelstation",
    fields: ["name", "typeId", "street", "city", "state", "zip", "latitude", "longitude"],
    validate
})(FuelstationForm)
