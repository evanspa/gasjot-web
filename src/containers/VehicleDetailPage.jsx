import React from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import FormattedBoolean from "../components/FormattedBoolean.jsx"
import { push } from 'react-router-redux'
import { Grid, Label, Button, Table, Row, Col } from "react-bootstrap";
import { Panel, FormattedMessage, FormattedRelative, FormattedDate } from 'react-intl';
import { Link } from "react-router"
import GasJotNavbar from "../components/NavBar.jsx"
import { connect } from 'react-redux'
import { markVehicleForEdit } from "../actions/actionCreators"
import SmallModal from "../components/SmallModal.jsx"
import * as strs from "../strings"
import {FieldRow} from "../Components/Field.jsx"

class VehicleDetailPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            modalTitle: null,
            modalContent: null
        };
    }

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { markVehicleForEdit } = this.props
        let modalClose = () => this.setState({ showModal: false })
        return (
            <div>
                <GasJotHelmet title="Vehicle Detail Page" />
                <div class="container"><GasJotNavbar /></div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Link to="/">back to vehicles</Link>
                            <h3>Vehicle Details</h3>
                            <Button style={{marginBottom: 10}} bsStyle="primary" onClick={() => markVehicleForEdit(vehiclePayload['fpvehicle/id'])}>Edit</Button>
                            <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
                        </Col>
                    </Row>
                    <Row><Col xs={12}><hr /></Col></Row>
                    <FieldRow
                        fieldName="Name"
                        fieldValue={vehiclePayload['fpvehicle/name']} />
                    <FieldRow
                        fieldName="Plate #"
                        fieldValue={vehiclePayload['fpvehicle/plate']} />
                    <FieldRow
                        fieldName="VIN"
                        fieldValue={vehiclePayload['fpvehicle/vin']} />
                    <FieldRow
                        fieldName="Fuel capacity"
                        fieldValue={vehiclePayload['fpvehicle/fuel-capacity']} />
                    <FieldRow
                        fieldName="Default octane"
                        fieldValue={vehiclePayload['fpvehicle/default-octane']} />
                    <FieldRow
                        fieldName="Takes diesel?"
                        fieldValue={<FormattedBoolean value={vehiclePayload['fpvehicle/is-diesel']} />} />
                    <FieldRow
                        fieldName={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mpg_readout_lbl, modalContent: strs.has_mpg_readout_explanation})}>{strs.has_mpg_readout_lbl}</a>}
                        fieldValue={<FormattedBoolean value={vehiclePayload['fpvehicle/has-mpg-readout']} />} />
                    <FieldRow
                        fieldName={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mph_readout_lbl, modalContent: strs.has_mph_readout_explanation})}>{strs.has_mph_readout_lbl}</a>}
                        fieldValue={<FormattedBoolean value={vehiclePayload['fpvehicle/has-mph-readout']} />} />
                    <FieldRow
                        fieldName={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_dte_readout_lbl, modalContent: strs.has_dte_readout_explanation})}>{strs.has_dte_readout_lbl}</a>}
                        fieldValue={<FormattedBoolean value={vehiclePayload['fpvehicle/has-dte-readout']} />} />
                    <FieldRow
                        fieldName={<a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_outside_temp_readout_lbl, modalContent: strs.has_outside_temp_readout_explanation})}>{strs.has_outside_temp_readout_lbl}</a>}
                        fieldValue={<FormattedBoolean value={vehiclePayload['fpvehicle/has-outside-temp-readout']} />} />
                    <FieldRow
                        fieldName="Created at"
                        fieldValue={<span><FormattedRelative value={vehiclePayload['fpvehicle/created-at']} /> &middot; <Label><FormattedDate value={vehiclePayload['fpvehicle/created-at']} /></Label></span>} />
                    <FieldRow
                        fieldName="Updated at"
                        fieldValue={<span><FormattedRelative value={vehiclePayload['fpvehicle/updated-at']} /> &middot; <Label><FormattedDate value={vehiclePayload['fpvehicle/updated-at']} /></Label></span>} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        vehicle: state.serverSnapshot._embedded.vehicles[ownProps.params.vehicleId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markVehicleForEdit: (vehicleId) => {
            dispatch(markVehicleForEdit(vehicleId))
            dispatch(push("/vehicles/" + vehicleId + "/edit"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailPage)
