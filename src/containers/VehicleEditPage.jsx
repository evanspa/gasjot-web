import React from "react"
import { Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehicleForm from "../components/VehicleForm.jsx"
import { cancelRecordEdit, attemptSaveVehicle, attemptDownloadVehicle } from "../actions/actionCreators"
import { toVehicleFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"

class VehicleEditPage extends React.Component {
    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { cancelVehicleEdit, handleSubmit, api, becameUnauthenticated } = this.props
        const { requestInProgress, fpErrorMask } = api
        const vehicleId = vehiclePayload["fpvehicle/id"]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your vehicle, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(vehicleId)} />
        const entityForm = <VehicleForm
                               cancelVehicleEdit={cancelVehicleEdit}
                               onSubmit={() => handleSubmit(vehicleId)}
                               requestInProgress={requestInProgress}
                               vehicleId={vehicleId}
                               initialValues={toVehicleFormModel(vehiclePayload)}
                               editMode={true}
                               fpErrorMask={fpErrorMask} />
        return (<EntityEditDetailPage
                    editMode={true}
                    entityType="vehicle"
                    entitiesUri="/vehicles"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
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
        cancelVehicleEdit: (vehicleId) => {
            dispatch(cancelRecordEdit())
            dispatch(push("/vehicles/" + vehicleId))
        },
        handleSubmit: (vehicleId) => { dispatch(attemptSaveVehicle(vehicleId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEditPage)
