import React from "react"
import { Label, Button, Table, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock, Row, Col, Input } from "react-bootstrap";
import * as strs from "../strings"
import SmallModal from "../components/SmallModal.jsx"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import { reduxForm } from 'redux-form'

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
        const { fields: {name, plate, vin, fuelCapacity, defaultOctane, takesDiesel, hasMpgReadout, hasMphReadout, hasDteReadout, hasOutsideTempReadout}, vehiclePayload, cancelVehicleEdit, handleSubmit, requestInProgress } = this.props

        let modalClose = () => this.setState({ showModal: false })
        const cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={() => cancelVehicleEdit(vehiclePayload['fpvehicle/id'])} disabled={requestInProgress}>Cancel</Button>
        const saveButton = <Button type="submit" style={{marginBottom: 0}} bsStyle="success" disabled={requestInProgress}>Save</Button>
        return (
        <div>
            <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
            <form onSubmit={handleSubmit}>
                { cancelButton }
                { saveButton }
                <Row><Col xs={12}><hr /></Col></Row>
                <FormGroup>
                    <ControlLabel type="text">Vehicle name</ControlLabel>
                    <FormControl type="text" defaultValue={vehiclePayload['fpvehicle/name']} onChange={name.onChange} name={name.name} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel type="text">Plate #</ControlLabel>
                    <FormControl type="text" defaultValue={vehiclePayload['fpvehicle/plate']} onChange={plate.onChange} name={plate.name} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel type="text">VIN</ControlLabel>
                    <FormControl type="text" defaultValue={vehiclePayload['fpvehicle/vin']} onChange={vin.onChange} name={vin.name} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel type="text">Fuel capacity</ControlLabel>
                    <FormControl type="text" defaultValue={vehiclePayload['fpvehicle/fuel-capacity']}  onChange={fuelCapacity.onChange} name={fuelCapacity.name} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel type="text">Default octane</ControlLabel>
                    <FormControl type="text" defaultValue={vehiclePayload['fpvehicle/default-octane']} onChange={defaultOctane.onChange} name={defaultOctane.name} />
                </FormGroup>
                <FormGroup>
                    <Checkbox inline defaultChecked={vehiclePayload['fpvehicle/is-diesel']} onChange={takesDiesel.onChange} name={takesDiesel.name}>
                        <ControlLabel type="text">Takes diesel?</ControlLabel>
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox inline defaultChecked={vehiclePayload['fpvehicle/has-mpg-readout']} onChange={hasMpgReadout.onChange} name={hasMpgReadout.name}>
                        <ControlLabel type="text">
                            <a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mpg_readout_lbl, modalContent: strs.has_mpg_readout_explanation})}>{strs.has_mpg_readout_lbl}</a>
                        </ControlLabel>
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox inline defaultChecked={vehiclePayload['fpvehicle/has-mph-readout']} onChange={hasMphReadout.onChange} name={hasMphReadout.name}>
                        <ControlLabel type="text">
                            <a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mph_readout_lbl, modalContent: strs.has_mph_readout_explanation})}>{strs.has_mph_readout_lbl}</a>
                        </ControlLabel>
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox inline defaultChecked={vehiclePayload['fpvehicle/has-dte-readout']} onChange={hasDteReadout.onChange} name={hasDteReadout.name}>
                        <ControlLabel type="text">
                            <a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_dte_readout_lbl, modalContent: strs.has_dte_readout_explanation})}>{strs.has_dte_readout_lbl}</a>
                        </ControlLabel>
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox inline defaultChecked={vehiclePayload['fpvehicle/has-outside-temp-readout']} onChange={hasOutsideTempReadout.onChange} name={hasOutsideTempReadout.name}>
                        <ControlLabel type="text">
                            <a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_outside_temp_readout_lbl, modalContent: strs.has_outside_temp_readout_explanation})}>{strs.has_outside_temp_readout_lbl}</a>
                        </ControlLabel>
                    </Checkbox>
                </FormGroup>
                {/*<FormGroup>
                <ControlLabel type="text" style={{marginRight: 10}}>Created at</ControlLabel>
                <DateTimePicker time={false} defaultValue={moment(vehiclePayload['fpvehicle/created-at']).toDate()} />
                </FormGroup>
                <FormGroup>
                <ControlLabel type="text" style={{marginRight: 10}}>Updated at</ControlLabel>
                <DateTimePicker time={false} defaultValue={moment(vehiclePayload['fpvehicle/updated-at']).toDate()} />
                </FormGroup>*/}
                <Row><Col xs={12}><hr /></Col></Row>
                { cancelButton }
                { saveButton }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: "vehicleEdit",
    fields: ["name", "plate", "vin", "fuelCapacity", "defaultOctane", "takesDiesel", "hasMpgReadout", "hasMphReadout", "hasDteReadout", "hasOutsideTempReadout"]
})(VehicleForm)
