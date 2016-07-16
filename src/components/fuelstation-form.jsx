import React from "react"
import { Button, Row, Col } from "react-bootstrap";
import { reduxForm, Field } from "redux-form"
import * as strs from "../strings"
import SmallModal from "./small-modal.jsx"
import { GasJotTextFormGroup,
         GasJotCheckboxFormGroup,
         GasJotDropdownFormGroup,
         GasJotNumberFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator, cannotBeUnselectedValidator, mustBeNumberValidator } from "../utils"
import { FSTYPES_ARRAY } from "../fstypes"
import _ from "lodash"
import { GAS_STATION_FORM } from "../forms"
import * as errFlags from "../error-flags"
import ActionsArray from "./actions-array.jsx"
import ErrorMessages from "./error-messages.jsx"

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
            modalContent: null,
            showEntityGoneModal: false,
            entityGoneModalTitle: "Deleted on other device",
            entityGoneModalContent: "It appears this gas station record was deleted from another device.  Let's take you back to your gas station list."
        };
    }

    componentWillReceiveProps(nextProps) {
        const { fuelstationId } = this.props
        const { fuelstationIdNotFound } = nextProps
        if (fuelstationIdNotFound != null && fuelstationId == fuelstationIdNotFound) {
            this.setState({showEntityGoneModal: true})
        }
    }

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        // https://github.com/erikras/redux-form/issues/190
        const {
            fields: {
                name,
                typeId,
                street,
                city,
                state,
                zip,
                latitude,
                longitude
            },
            fuelstationId,
            markFuelstationForEdit,
            cancelFuelstationEdit,
            userAcknowledgedNotFound,
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
                                deleteEntity={
                                    (fuelstationId) => {
                                        this.setState({
                                            entityGoneModalTitle: "Already deleted",
                                            entityGoneModalContent: "It would appear this gas station record was already deleted on another device.  Let's take you back to your gas station list."
                                        })
                                        deleteFuelstation(fuelstationId)
                                    }
                                }
                                deleteEntityConfirmMessage={deleteConfirmMessage} />
        const errors = [
            { flag: errFlags.SAVE_FUELSTATION_CANNOT_BE_PURPLEX,
              message: "Gas station name cannot contain 'purplex'."}
        ]
        return (
            <div>
                <SmallModal
                    show={this.state.showModal}
                    buttonTitle="Close"
                    onHide={modalClose}
                    title={this.state.modalTitle}
                    content={this.state.modalContent} />
                <SmallModal
                    show={this.state.showEntityGoneModal}
                    buttonTitle="Okay"
                    onHide={() => {
                            this.setState({ showEntityGoneModal: false })
                            userAcknowledgedNotFound(fuelstationId)
                        }}
                    title={this.state.entityGoneModalTitle}
                    content={this.state.entityGoneModalContent} />
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
                    <GasJotNumberFormGroup
                        label="Latitude"
                        field={latitude}
                        disabled={!editMode} />
                    <GasJotNumberFormGroup
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
    form: GAS_STATION_FORM,
    fields: ["name", "typeId", "street", "city", "state", "zip", "latitude", "longitude"],
    destroyOnUnmount: false,
    validate
})(FuelstationForm)
