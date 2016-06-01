import React from "react"
import { Button, Row, Col } from "react-bootstrap";
import momentLocalizer from "react-widgets/lib/localizers/moment"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import moment from "moment"
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import SmallModal from "./SmallModal.jsx"
import { GasJotTextFormGroup, GasJotCheckboxFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, mustBeNumberValidator } from "../utils"
import _ from "lodash"

const validate = values => {
    const errors = {}
    mustBeNumberValidator(values, errors, "fuelCapacity")
    mustBeNumberValidator(values, errors, "defaultOctane")
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
                vehiclePayload,
                markVehicleForEdit,
                cancelVehicleEdit,
                handleSubmit,
                requestInProgress,
                editMode } = this.props
        const anyErrors = (name.error != null) || (fuelCapacity.error != null) || (defaultOctane.error != null) || (name.error != null)
        let modalClose = () => this.setState({ showModal: false })
        let cancelButton = null
        let saveButton = null
        let editButton = null
        let actionArray;
        if (editMode) {
            cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={() => cancelVehicleEdit(vehiclePayload['fpvehicle/id'])} disabled={requestInProgress}>Cancel</Button>
            saveButton = <Button type="submit" style={{marginBottom: 0}} bsStyle="success" disabled={requestInProgress || anyErrors}>Save</Button>
            actionArray = <div>{cancelButton}{saveButton}</div>
        } else {
            editButton = <Button bsStyle="primary" onClick={() => markVehicleForEdit(vehiclePayload['fpvehicle/id'])}>Edit</Button>
            actionArray = editButton
        }
        return (
        <div>
            <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
            <form onSubmit={handleSubmit}>
                { actionArray }
                <Row><Col xs={12}><hr /></Col></Row>
                <GasJotTextFormGroup
                    label="Vehicle name"
                    defaultValue={vehiclePayload['fpvehicle/name']}
                    field={name}
                    disabled={!editMode}
                    autoFocus={true} />
                <GasJotTextFormGroup
                    label="Plate #"
                    defaultValue={vehiclePayload['fpvehicle/plate']}
                    field={plate}
                    disabled={!editMode} />
                <GasJotTextFormGroup
                    label="VIN"
                    defaultValue={vehiclePayload['fpvehicle/vin']}
                    field={vin}
                    disabled={!editMode} />
                <GasJotTextFormGroup
                    label="Fuel capacity"
                    defaultValue={vehiclePayload['fpvehicle/fuel-capacity']}
                    field={fuelCapacity}
                    disabled={!editMode} />
                <GasJotTextFormGroup
                    label="Default octane"
                    defaultValue={vehiclePayload['fpvehicle/default-octane']}
                    field={defaultOctane}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label="Takes diesel?"
                    defaultChecked={vehiclePayload['fpvehicle/is-diesel']}
                    field={takesDiesel}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mpg_readout_lbl, modalContent: strs.has_mpg_readout_explanation})}>{strs.has_mpg_readout_lbl}</a>}
                    defaultChecked={vehiclePayload['fpvehicle/has-mpg-readout']}
                    field={hasMpgReadout}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mph_readout_lbl, modalContent: strs.has_mph_readout_explanation})}>{strs.has_mph_readout_lbl}</a>}
                    defaultChecked={vehiclePayload['fpvehicle/has-mph-readout']}
                    field={hasMphReadout}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_dte_readout_lbl, modalContent: strs.has_dte_readout_explanation})}>{strs.has_dte_readout_lbl}</a>}
                    defaultChecked={vehiclePayload['fpvehicle/has-dte-readout']}
                    field={hasDteReadout}
                    disabled={!editMode} />
                <GasJotCheckboxFormGroup
                    label={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_outside_temp_readout_lbl, modalContent: strs.has_outside_temp_readout_explanation})}>{strs.has_outside_temp_readout_lbl}</a>}
                    defaultChecked={vehiclePayload['fpvehicle/has-outside-temp-readout']}
                    field={hasOutsideTempReadout}
                    disabled={!editMode} />
                {/*<FormGroup>
                <ControlLabel type="text" style={{marginRight: 10}}>Created at</ControlLabel>
                <DateTimePicker time={false} defaultValue={moment(vehiclePayload['fpvehicle/created-at']).toDate()} />
                </FormGroup>
                <FormGroup>
                <ControlLabel type="text" style={{marginRight: 10}}>Updated at</ControlLabel>
                <DateTimePicker time={false} defaultValue={moment(vehiclePayload['fpvehicle/updated-at']).toDate()} />
                </FormGroup>*/}
                <Row><Col xs={12}><hr /></Col></Row>
                { actionArray }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: "vehicleEdit",
    fields: ["name", "plate", "vin", "fuelCapacity", "defaultOctane", "takesDiesel", "hasMpgReadout", "hasMphReadout", "hasDteReadout", "hasOutsideTempReadout"],
    validate
})(VehicleForm)
