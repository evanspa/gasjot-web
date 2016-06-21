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
    cannotBeEmptyValidator(values, errors, "logDate")
    cannotBeEmptyValidator(values, errors, "numGallons")
    mustBePositiveNumberValidator(values, errors, "numGallons")
    mustBePositiveNumberValidator(values, errors, "avgMpgReadout")
    mustBePositiveNumberValidator(values, errors, "rangeReadout")
    mustBePositiveNumberValidator(values, errors, "avgMphReadout")
    mustBeNumberValidator(values, errors, "outsideTempReadout")
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
            fields: { vehicleId, logDate, odometer, avgMpgReadout, rangeReadout, avgMphReadout, outsideTempReadout },
            vehicles,
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
                    <GasJotDateFormGroup
                        label="Log date"
                        field={logDate}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Odometer"
                        field={odometer}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Average MPG readout"
                        field={avgMpgReadout}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Average MPH readout"
                        field={avgMphReadout}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Range readout"
                        field={rangeReadout}
                        disabled={!editMode} />
                    <GasJotTextFormGroup
                        label="Outside temperature readout"
                        field={outsideTempReadout}
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
    fields: ["vehicleId", "logDate", "odometer", "avgMpgReadout", "rangeReadout", "avgMphReadout", "outsideTempReadout"],
    validate
})(GasLogForm)
