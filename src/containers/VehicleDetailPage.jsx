import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import VehicleForm from "../components/VehicleForm.jsx"
import { markVehicleForEdit, attemptDownloadVehicle } from "../actions/actionCreators"
import { toVehicleFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "../containers/ReauthenticateModal.jsx"
import * as urls from "../urls"

class VehicleDetailPage extends React.Component {
    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { markVehicleForEdit, downloadVehicle, becameUnauthenticated } = this.props
        const vehicleId = vehiclePayload["fpvehicle/id"]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your vehicle, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadVehicle(vehicleId)} />
        const entityForm = <VehicleForm
                               markVehicleForEdit={markVehicleForEdit}
                               downloadVehicle={downloadVehicle}
                               vehicleId={vehiclePayload["fpvehicle/id"]}
                               initialValues={toVehicleFormModel(vehiclePayload)}
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
    return {
        vehicle: state.serverSnapshot._embedded.vehicles[ownProps.params.vehicleId],
        becameUnauthenticated: state.becameUnauthenticated
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
            dispatch(attemptDownloadVehicle(vehicleId, urls.vehicleDetailUrl(vehicleId)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailPage)
