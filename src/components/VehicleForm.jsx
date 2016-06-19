import React from "react"
import { Label, Button, Row, Col } from "react-bootstrap";
import momentLocalizer from "react-widgets/lib/localizers/moment"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import moment from "moment"
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import SmallModal from "./SmallModal.jsx"
import { GasJotTextFormGroup, GasJotCheckboxFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, mustBePositiveNumberValidator } from "../utils"
import _ from "lodash"
import * as errFlags from "../errorFlags"
import ActionsArray from "./ActionsArray.jsx"
import ErrorMessages from "./ErrorMessages.jsx"

const validate = values => {
    const errors = {}
    mustBePositiveNumberValidator(values, errors, "fuelCapacity")
    mustBePositiveNumberValidator(values, errors, "defaultOctane")
    cannotBeEmptyValidator(values, errors, "name")
    return errors
}

class VehicleForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            modalTitle: null,
            modalContent: null
        };
    }

    render() {
        momentLocalizer(moment)
        // https://github.com/erikras/redux-form/issues/190
        const { fields: {name,
                         plate,
                         vin,
                         fuelCapacity,
                         defaultOctane,
                         takesDiesel,
                         hasMpgReadout,
                         hasMphReadout,
                         hasDteReadout,
                         hasOutsideTempReadout},
                vehicleId,
                markVehicleForEdit,
                cancelVehicleEdit,
                downloadVehicle,
                handleSubmit,
                requestInProgress,
                responseStatus,
                editMode,
                fpErrorMask } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={vehicleId}
                                cancelEntityEdit={cancelVehicleEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markVehicleForEdit}
                                cancelEntityAdd={cancelVehicleEdit}
                                downloadEntity={downloadVehicle} />
        const errors = [
            { flag: errFlags.SAVE_VEHICLE_CANNOT_BE_BOTH_DIESEL_OCTANE,
              message: "Vehicle cannot have default octane and take diesel."},
            { flag: errFlags.SAVE_VEHICLE_CANNOT_BE_PURPLE,
              message: "Vehicle name cannot contain 'purple'."},
            { flag: errFlags.SAVE_VEHICLE_CANNOT_BE_RED,
              message: "Vehicle name cannot contain 'red'."},
            { flag: errFlags.SAVE_VEHICLE_ALREADY_EXISTS,
              message: "Vehicle name already used."}
        ]
        return (
        <div>
            <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
            <ErrorMessages errorMask={fpErrorMask} errors={errors} />
            <form onSubmit={handleSubmit}>
                { actionArray }
                <Row><Col xs={12}><hr /></Col></Row>
                <GasJotTextFormGroup
                    label="Vehicle name"
                    field={name}
                    disabled={!editMode}
                    autoFocus={true} />
                <GasJotTextFormGroup
                    label="Plate #"
                    field={plate}
                    disabled={!editMode} />
                <GasJotTextFormGroup
                    label="VIN"
                    field={vin}
                    disabled={!editMode} />
                <GasJotTextFormGroup
                    label="Fuel capacity"
                    field={fuelCapacity}
                    disabled={!editMode} />
                <GasJotTextFormGroup
                    label="Default octane"
                    field={defaultOctane}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label="Takes diesel?"
                    field={takesDiesel}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mpg_readout_lbl, modalContent: strs.has_mpg_readout_explanation})}>{strs.has_mpg_readout_lbl}</a>}
                    field={hasMpgReadout}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mph_readout_lbl, modalContent: strs.has_mph_readout_explanation})}>{strs.has_mph_readout_lbl}</a>}
                    field={hasMphReadout}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_dte_readout_lbl, modalContent: strs.has_dte_readout_explanation})}>{strs.has_dte_readout_lbl}</a>}
                    field={hasDteReadout}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_outside_temp_readout_lbl, modalContent: strs.has_outside_temp_readout_explanation})}>{strs.has_outside_temp_readout_lbl}</a>}
                    field={hasOutsideTempReadout}
                    disabled={!editMode} />
                <Row><Col xs={12}><hr style={{ marginTop: 0, marginBottom: 15}}/></Col></Row>
                { actionArray }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: "vehicle",
    fields: ["name", "plate", "vin", "fuelCapacity", "defaultOctane", "takesDiesel", "hasMpgReadout", "hasMphReadout", "hasDteReadout", "hasOutsideTempReadout"],
    validate
})(VehicleForm)
