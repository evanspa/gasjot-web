import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehicleForm from "../components/VehicleForm.jsx"
import { markVehicleForEdit } from "../actions/actionCreators"
import { toVehicleFormModel } from "../utils"

class VehicleDetailPage extends React.Component {

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { markVehicleForEdit } = this.props
        return (
            <div>
                <GasJotHelmet title="Vehicle Detail Page" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <Link to="/vehicles">&#8592; back to vehicles</Link>
                    <h3 style={{paddingBottom: 5}}>Vehicle Details</h3>
                    <VehicleForm
                        markVehicleForEdit={markVehicleForEdit}
                        vehicleId={vehiclePayload["fpvehicle/id"]}
                        initialValues={toVehicleFormModel(vehiclePayload)}
                        editMode={false} />
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
