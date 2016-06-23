import React from "react"
import { Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import SmallModal from "./SmallModal.jsx"
import { GasJotTextFormGroup,
         GasJotDateFormGroup,
         GasJotCheckboxFormGroup,
         GasJotDropdownFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator,
         mustBePositiveNumberValidator,
         cannotBeUnselectedValidator,
         mustBeNumberValidator } from "../utils"
import _ from "lodash"
import * as errFlags from "../errorFlags"
import ActionsArray from "./ActionsArray.jsx"
import ErrorMessages from "./ErrorMessages.jsx"

const validate = values => {
    const errors = {}
    cannotBeUnselectedValidator(values, errors, "vehicleId", "Select a vehicle.")
    cannotBeUnselectedValidator(values, errors, "fuelstationId", "Select a gas station.")
    cannotBeEmptyValidator(values, errors, "purchaseDate")
    cannotBeEmptyValidator(values, errors, "numGallons")
    mustBePositiveNumberValidator(values, errors, "numGallons")
    cannotBeEmptyValidator(values, errors, "octane")
    mustBePositiveNumberValidator(values, errors, "octane")
    cannotBeEmptyValidator(values, errors, "odometer")
    mustBePositiveNumberValidator(values, errors, "odometer")
    mustBePositiveNumberValidator(values, errors, "pricePerGallon")
    mustBePositiveNumberValidator(values, errors, "carWashPerGallonDiscount")
    return errors
}

class GasLogForm extends React.Component {

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
            fields: { vehicleId, fuelstationId, purchaseDate, octane, odometer, pricePerGallon, gotCarWash, carWashPerGallonDiscount, numGallons },
            vehicles,
            fuelstations,
            gasLogId,
            markGasLogForEdit,
            cancelGasLogEdit,
            downloadGasLog,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            fpErrorMask
        } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={gasLogId}
                                cancelEntityEdit={cancelGasLogEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markGasLogForEdit}
                                cancelEntityAdd={cancelGasLogEdit}
                                downloadEntity={downloadGasLog} />
        const errors = [
            { flag: errFlags.SAVE_GASLOG_VEHICLE_DOES_NOT_EXIST,
              message: "The selected vehicle no longer exists."},
            { flag: errFlags.SAVE_GASLOG_FUELSTATION_DOES_NOT_EXIST,
              message: "The selected gas station no longer exists."}
        ]
        return (
            <div>
                <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
                <ErrorMessages errorMask={fpErrorMask} errors={errors} />
                <form onSubmit={handleSubmit}>
                    { actionArray }
                    <Row><Col xs={12}><hr /></Col></Row>
                    <GasJotDropdownFormGroup
                        label="Vehicle"
                        field={vehicleId}
                        disabled={!editMode}
                        valueField="fpvehicle/id"
                        textField="fpvehicle/name"
                        data={vehicles} />
                    <GasJotDropdownFormGroup
                        label="Gas station"
                        field={fuelstationId}
                        disabled={!editMode}
                        valueField="fpfuelstation/id"
                        textField="fpfuelstation/name"
                        data={fuelstations} />
                    <GasJotDateFormGroup
                        label="Purchase date"
                        field={purchaseDate}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Octane"
                        field={octane}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Odometer"
                        field={odometer}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Price per gallon"
                        field={pricePerGallon}
                        disabled={!editMode} />
                    <GasJotCheckboxFormGroup
                        label="Got car wash?"
                        field={gotCarWash}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Car wash per-gallon discount"
                        field={carWashPerGallonDiscount}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Num gallons"
                        field={numGallons}
                        disabled={!editMode} />
                    <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                    { actionArray }
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "gaslog",
    fields: ["vehicleId", "fuelstationId", "purchaseDate", "octane", "odometer", "pricePerGallon", "gotCarWash", "carWashPerGallonDiscount", "numGallons"],
    validate
})(GasLogForm)
