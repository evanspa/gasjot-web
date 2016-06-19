import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import FuelstationForm from "../components/FuelstationForm.jsx"
import { markFuelstationForEdit, attemptDownloadFuelstation } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"

class FuelstationDetailPage extends React.Component {
    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const { markFuelstationForEdit, downloadFuelstation, becameUnauthenticated } = this.props
        const fuelstationId = fuelstationPayload["fpfuelstation/id"]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your gas station, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadFuelstation(fuelstationId)} />
        const entityForm = <FuelstationForm
                               markFuelstationForEdit={markFuelstationForEdit}
                               downloadFuelstation={downloadFuelstation}
                               fuelstationId={fuelstationPayload["fpfuelstation/id"]}
                               initialValues={toFuelstationFormModel(fuelstationPayload)}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    entityType="gas station"
                    entitiesUri="/fuelstations"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        fuelstation: state.serverSnapshot._embedded.fuelstations[ownProps.params.fuelstationId],
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markFuelstationForEdit: (fuelstationId) => {
            toastr.clean()
            dispatch(markFuelstationForEdit(fuelstationId))
            dispatch(push("/fuelstations/" + fuelstationId + "/edit"))
        },
        downloadFuelstation: (fuelstationId) => {
            dispatch(attemptDownloadFuelstation(fuelstationId, "/fuelstations/" + fuelstationId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationDetailPage)
