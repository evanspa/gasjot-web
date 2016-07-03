import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import VehicleForm from "../components/VehicleForm.jsx"
import { markVehicleForEdit,
         attemptDownloadVehicle,
         attemptDeleteVehicle,
         clearErrors,
         serverVehicleNotFoundUserAcknowledged } from "../actions/actionCreators"
import { toVehicleFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "../containers/ReauthenticateModal.jsx"
import * as urls from "../urls"
import * as utils from "../utils"

class VehicleDetailPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.vehicle != null;
    }

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { markVehicleForEdit,
                downloadVehicle,
                clearErrors,
                userAcknowledgedNotFound,
                vehicleIdNotFound,
                deleteVehicle,
                becameUnauthenticated,
                deleteConfirmMessage
        } = this.props
        const vehicleId = vehiclePayload["fpvehicle/id"]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your vehicle, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadVehicle(vehicleId)} />
        const entityForm = <VehicleForm
                               markVehicleForEdit={markVehicleForEdit}
                               downloadVehicle={downloadVehicle}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               vehicleIdNotFound={vehicleIdNotFound}
                               clearErrors={clearErrors}
                               deleteVehicle={deleteVehicle}
                               vehicleId={vehicleId}
                               initialValues={toVehicleFormModel(vehiclePayload)}
                               deleteConfirmMessage={deleteConfirmMessage}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    entityType="vehicle"
                    entitiesUri={urls.VEHICLES_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    let numOdometerLogs = utils.countDependents(state, "envlogs", "envlog/vehicle-id", ownProps.params.vehicleId)
    let numGasLogs = utils.countDependents(state, "fplogs", "fplog/vehicle-id", ownProps.params.vehicleId)
    let deleteConfirmMessage
    if (numOdometerLogs > 0) {
        if (numGasLogs > 0) {
            deleteConfirmMessage = [
                "This vehicle has ",
                <strong key="numOdoLogs">{numOdometerLogs}</strong>,
                " odometer logs and ",
                <strong key="numGasLogs">{numGasLogs}</strong>,
                " gas logs associated with it that would also be deleted.",
                <br key="spacer1" />,
                <br key="spacer2" />,
                "Are you sure you want to delete this vehicle?"
            ]
        } else {
            deleteConfirmMessage = [
                "This vehicle has ",
                <strong key="numOdoLogs">{numOdometerLogs}</strong>,
                " odometer logs associated with it that would also be deleted.",
                <br key="spacer1" />,
                <br key="spacer2" />,
                "Are you sure you want to delete this vehicle?"
            ]
        }
    } else if (numGasLogs > 0) {
        deleteConfirmMessage = [
            "This vehicle has ",
            <strong key="numGasLogs">{numGasLogs}</strong>,
            " gas logs associated with it that would also be deleted.",
            <br key="spacer1" />,
            <br key="spacer2" />,
            "Are you sure you want to delete this vehicle?"
        ]
    } else {
        deleteConfirmMessage = "Are you sure you want to delete this vehicle record?"
    }
    return {
        vehicle: state.serverSnapshot._embedded.vehicles[ownProps.params.vehicleId],
        becameUnauthenticated: state.becameUnauthenticated,
        deleteConfirmMessage: deleteConfirmMessage,
        vehicleIdNotFound: state.api.vehicleIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markVehicleForEdit: (vehicleId) => {
            toastr.clean()
            dispatch(markVehicleForEdit(vehicleId))
            dispatch(push(urls.vehicleEditUrl(vehicleId)))
        },
        downloadVehicle: (vehicleId) => {
            toastr.clean()
            dispatch(attemptDownloadVehicle(vehicleId, urls.vehicleDetailUrl(vehicleId)))
        },
        deleteVehicle: (vehicleId) => {
            toastr.clean()
            dispatch(attemptDeleteVehicle(vehicleId))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (vehicleId) => {
            dispatch(serverVehicleNotFoundUserAcknowledged(vehicleId))
            dispatch(push(urls.VEHICLES_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailPage)
