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
import { GAS_LOG_FORM } from "../forms"
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
    cannotBeEmptyValidator(values, errors, "pricePerGallon")
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
            modalContent: null,
            showEntityGoneModal: false,
            entityGoneModalTitle: "Deleted on other device",
            entityGoneModalContent: "It appears this gas log record was deleted from another device.  Let's take you back to your logs."
        };
    }

    componentWillReceiveProps(nextProps) {
        const { gasLogId } = this.props
        const { gasLogIdNotFound } = nextProps
        if (gasLogIdNotFound != null && gasLogId == gasLogIdNotFound) {
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
                fuelstationId,
                purchaseDate,
                octane,
                odometer,
                pricePerGallon,
                gotCarWash,
                carWashPerGallonDiscount,
                numGallons
            },
            vehicles,
            fuelstations,
            gasLogId,
            markGasLogForEdit,
            cancelGasLogEdit,
            userAcknowledgedNotFound,
            downloadGasLog,
            deleteGasLog,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            fpErrorMask,
            deleteConfirmMessage,
            destroyVehicleForm,
            destroyFuelstationForm
        } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={gasLogId}
                                cancelEntityEdit={cancelGasLogEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markGasLogForEdit}
                                cancelEntityAdd={cancelGasLogEdit}
                                downloadEntity={downloadGasLog}
                                deleteEntity={
                                    (gasLogId) => {
                                        this.setState({
                                            entityGoneModalTitle: "Already deleted",
                                            entityGoneModalContent: "It would appear this gas log record was already deleted on another device.  Let's take you back to your logs."
                                        })
                                        deleteGasLog(gasLogId)
                                    }
                                }
                                deleteEntityConfirmMessage={deleteConfirmMessage} />
        const errors = [
            { flag: errFlags.SAVE_GASLOG_VEHICLE_DOES_NOT_EXIST,
              message: "The selected vehicle no longer exists."},
            { flag: errFlags.SAVE_GASLOG_FUELSTATION_DOES_NOT_EXIST,
              message: "The selected gas station no longer exists."}
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
                            userAcknowledgedNotFound(gasLogId)
                        }}
                    title={this.state.entityGoneModalTitle}
                    content={this.state.entityGoneModalContent} />
                <ErrorMessages errorMask={fpErrorMask} errors={errors} />
                <form onSubmit={handleSubmit}>
                    { actionArray }
                    <Row><Col xs={12}><hr /></Col></Row>
                    <GasJotDropdownFormGroup
                        label="Vehicle"
                        field={vehicleId}
                        disabled={!editMode}
                        needToAddTextLinkObj={utils.makeNeedToAddTextLinkObj(editMode, "Need to add your vehicle?", urls.ADD_VEHICLE_URI, destroyVehicleForm)}
                        valueField="fpvehicle/id"
                        textField="fpvehicle/name"
                        data={vehicles} />
                    <GasJotDropdownFormGroup
                        label="Gas station"
                        field={fuelstationId}
                        disabled={!editMode}
                        needToAddTextLinkObj={utils.makeNeedToAddTextLinkObj(editMode, "Need to add a gas station?", urls.ADD_FUELSTATION_URI, destroyFuelstationForm)}
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
    form: GAS_LOG_FORM,
    fields: ["vehicleId", "fuelstationId", "purchaseDate", "octane", "odometer", "pricePerGallon", "gotCarWash", "carWashPerGallonDiscount", "numGallons"],
    destroyOnUnmount: false,
    validate
})(GasLogForm)
