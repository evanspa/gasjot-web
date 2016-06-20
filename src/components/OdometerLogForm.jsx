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
import { FSTYPES_ARRAY } from "../fstypes"
import _ from "lodash"
import * as errFlags from "../errorFlags"
import ActionsArray from "./ActionsArray.jsx"
import ErrorMessages from "./ErrorMessages.jsx"

const validate = values => {
    const errors = {}
    cannotBeUnselectedValidator(values, errors, "vehicleId", "Select a vehicle.")
    cannotBeEmptyValidator(values, errors, "odometer")
    mustBePositiveNumberValidator(values, errors, "odometer")
    mustBePositiveNumberValidator(values, errors, "avgMpgReadout")
    mustBePositiveNumberValidator(values, errors, "rangeReadout")
    mustBePositiveNumberValidator(values, errors, "avgMphReadout")
    mustBeNumberValidator(values, errors, "outsideTempReadout")
    return errors
}

class OdometerLogForm extends React.Component {

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
        const { fields: { vehicleId, logDate, odometer, avgMpgReadout, rangeReadout, avgMphReadout, outsideTempReadout },
                vehicles,
                odometerLogId,
                markOdometerLogForEdit,
                cancelOdometerLogEdit,
                downloadOdometerLog,
                handleSubmit,
                requestInProgress,
                responseStatus,
                editMode,
                fpErrorMask } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={odometerLogId}
                                cancelEntityEdit={cancelOdometerLogEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markOdometerLogForEdit}
                                cancelEntityAdd={cancelOdometerLogEdit}
                                downloadEntity={downloadOdometerLog} />
        const errors = [
            { flag: errFlags.SAVE_ODOMETERLOG_VEHICLE_DOES_NOT_EXIST,
              message: "The selected vehicle no longer exists."}
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
    form: "odometerlog",
    fields: ["vehicleId", "logDate", "odometer", "avgMpgReadout", "rangeReadout", "avgMphReadout", "outsideTempReadout"],
    validate
})(OdometerLogForm)
