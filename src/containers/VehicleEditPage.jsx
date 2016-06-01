import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehicleForm from "../components/VehicleForm.jsx"
import { attemptSaveVehicle } from "../actions/actionCreators"

class VehicleEditPage extends React.Component {

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { cancelVehicleEdit, handleSubmit, requestInProgress } = this.props
        return (
            <div>
                <GasJotHelmet title="Edit Vehicle" />
                <div className="container"><GasJotNavbar /></div>
                <Col xs={8} xsOffset={2}>
                    <Row>
                        <Col xs={12}>
                            <Link to="/">&#8592; back to vehicles</Link>
                            <h3 style={{paddingBottom: 5}}>Edit Vehicle</h3>
                            <VehicleForm
                                cancelVehicleEdit={cancelVehicleEdit}
                                onSubmit={() => handleSubmit(vehiclePayload['fpvehicle/id'])}
                                requestInProgress={requestInProgress}
                                vehiclePayload={vehiclePayload}
                                editMode={true} />
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
