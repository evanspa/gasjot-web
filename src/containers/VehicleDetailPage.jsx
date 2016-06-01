import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehicleForm from "../components/VehicleForm.jsx"
import { markVehicleForEdit } from "../actions/actionCreators"

class VehicleDetailPage extends React.Component {

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { markVehicleForEdit } = this.props
        return (
            <div>
                <GasJotHelmet title="Vehicle Detail Page" />
                <div className="container"><GasJotNavbar /></div>
                <Col xs={8} xsOffset={2}>
                    <Row>
                        <Col xs={12}>
                            <Link to="/?tabKey=1">&#8592; back to vehicles</Link>
                            <h3 style={{paddingBottom: 5}}>Vehicle Details</h3>
                            <VehicleForm
                                markVehicleForEdit={markVehicleForEdit}
                                vehiclePayload={vehiclePayload}
                                editMode={false} />
                        </Col>
                    </Row>
                </Col>
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
