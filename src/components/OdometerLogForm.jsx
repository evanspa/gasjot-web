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
import * as urls from "../urls"
import * as utils from "../utils"
import { ODOMETER_LOG_FORM } from "../forms"
import ActionsArray from "./ActionsArray.jsx"
import ErrorMessages from "./ErrorMessages.jsx"

const validate = values => {
    const errors = {}
    cannotBeUnselectedValidator(values, errors, "vehicleId", "Select a vehicle.")
    cannotBeEmptyValidator(values, errors, "logDate")
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
            modalContent: null,
            showEntityGoneModal: false,
            entityGoneModalTitle: "Deleted on other device",
            entityGoneModalContent: "It appears this odometer log record was deleted from another device.  Let's take you back to your logs."
        };
    }

    componentWillReceiveProps(nextProps) {
        const { odometerLogId } = this.props
        const { odometerLogIdNotFound } = nextProps
        if (odometerLogIdNotFound != null && odometerLogId == odometerLogIdNotFound) {
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
                vehicleId,
                logDate,
                odometer,
                avgMpgReadout,
                rangeReadout,
                avgMphReadout,
                outsideTempReadout
            },
            defaultVehicle,
            vehicles,
            odometerLogId,
            markOdometerLogForEdit,
            cancelOdometerLogEdit,
            userAcknowledgedNotFound,
            downloadOdometerLog,
            deleteOdometerLog,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            fpErrorMask,
            deleteConfirmMessage,
            destroyVehicleForm
        } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={odometerLogId}
                                cancelEntityEdit={cancelOdometerLogEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markOdometerLogForEdit}
                                cancelEntityAdd={cancelOdometerLogEdit}
                                downloadEntity={downloadOdometerLog}
                                deleteEntity={
                                    (odometerLogId) => {
                                        this.setState({
                                            entityGoneModalTitle: "Already deleted",
                                            entityGoneModalContent: "It would appear this odometer log record was already deleted on another device.  Let's take you back to your logs."
                                        })
                                        deleteOdometerLog(odometerLogId)
                                    }
                                }
                                deleteEntityConfirmMessage={deleteConfirmMessage} />
        const errors = [
            { flag: errFlags.SAVE_ODOMETERLOG_VEHICLE_DOES_NOT_EXIST,
              message: "The selected vehicle no longer exists." }
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
                            userAcknowledgedNotFound(odometerLogId)
                        }}
                    title={this.state.entityGoneModalTitle}
                    content={this.state.entityGoneModalContent} />
                <ErrorMessages errorMask={fpErrorMask} errors={errors} />
                <form onSubmit={handleSubmit}>
                    { actionArray }
                    <Row><Col xs={12}><hr /></Col></Row>
                    <GasJotDropdownFormGroup
                        label="Vehicle"
                        defaultValue={defaultVehicle}
                        field={vehicleId}
                        disabled={!editMode}
                        valueField="fpvehicle/id"
                        textField="fpvehicle/name"
                        needToAddTextLinkObj={utils.makeNeedToAddTextLinkObj(editMode, "Need to add your vehicle?", urls.ADD_VEHICLE_URI, destroyVehicleForm)}
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
    form: ODOMETER_LOG_FORM,
    fields: ["vehicleId", "logDate", "odometer", "avgMpgReadout", "rangeReadout", "avgMphReadout", "outsideTempReadout"],
    destroyOnUnmount: false,
    validate
})(OdometerLogForm)
