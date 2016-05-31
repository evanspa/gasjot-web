import React from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Grid, Label, Button, Table, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock, Row, Col, Input } from "react-bootstrap";
import { push } from 'react-router-redux'
import { Link } from "react-router"
import GasJotNavbar from "../components/NavBar.jsx"
import { connect } from 'react-redux'
import * as strs from "../strings"
import SmallModal from "../components/SmallModal.jsx"
import FormattedBoolean from "../components/FormattedBoolean.jsx"
import { Panel, FormattedRelative, FormattedDate } from 'react-intl'
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import { reduxForm } from 'redux-form'
import VehicleForm from "../components/VehicleForm.jsx"
import { attemptSaveVehicle } from "../actions/actionCreators"

class VehicleEditPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        momentLocalizer(moment)
        const vehiclePayload = this.props.vehicle.payload
        const { cancelVehicleEdit, handleSubmit, requestInProgress } = this.props
        const cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={() => cancelVehicleEdit(vehiclePayload['fpvehicle/id'])}>Cancel</Button>
        const saveButton = <Button style={{marginBottom: 0}} bsStyle="success">Save</Button>
        return (
            <div>
                <GasJotHelmet title="Edit Vehicle" />
                <div class="container"><GasJotNavbar /></div>
                <Col xs={8} xsOffset={2}>
                    <Row>
                        <Col xs={12}>
                            <Link to="/">back to vehicles</Link>
                            <h3 style={{paddingBottom: 5}}>Edit Vehicle</h3>
                            <VehicleForm
                                cancelVehicleEdit={cancelVehicleEdit}
                                onSubmit={() => handleSubmit(vehiclePayload['fpvehicle/id'])}
                                requestInProgress={requestInProgress}
                                vehiclePayload={vehiclePayload} />
                        </Col>
                    </Row>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requestInProgress: state.api.requestInProgress,
        vehicle: state.serverSnapshot._embedded.vehicles[ownProps.params.vehicleId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelVehicleEdit: (vehicleId) => { dispatch(push("/vehicles/" + vehicleId)) },
        handleSubmit: (vehicleId) => {
            dispatch(attemptSaveVehicle(vehicleId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEditPage)
