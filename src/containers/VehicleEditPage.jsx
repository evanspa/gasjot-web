import React from "react"
import { Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehicleForm from "../components/VehicleForm.jsx"
import { attemptSaveVehicle } from "../actions/actionCreators"
import { toVehicleFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import ReauthenticateModal from "./ReauthenticateModal.jsx"

class VehicleEditPage extends React.Component {

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { cancelVehicleEdit, handleSubmit, api, becameUnauthenticated } = this.props
        const { responseStatus, requestInProgress, fpErrorMask } = api
        const vehicleId = vehiclePayload["fpvehicle/id"]
        return (
            <div>
                <GasJotHelmet title="Edit Vehicle" />
                <GasJotNavbar />
                <ReauthenticateModal showModal={becameUnauthenticated} />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <Link to="/vehicles">&#8592; your vehicles</Link>
                    <h3 style={{paddingBottom: 5}}>Edit Vehicle</h3>
                    <VehicleForm
                        cancelVehicleEdit={cancelVehicleEdit}
                        onSubmit={() => handleSubmit(vehicleId)}
                        requestInProgress={requestInProgress}
                        vehicleId={vehicleId}
                        initialValues={toVehicleFormModel(vehiclePayload)}
                        editMode={true}
                        fpErrorMask={fpErrorMask} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        vehicle: state.serverSnapshot._embedded.vehicles[ownProps.params.vehicleId],
        becameUnauthenticated: state.becameUnauthenticated
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
