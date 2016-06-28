import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FuelstationForm from "../components/FuelstationForm.jsx"
import { markFuelstationForEdit,
         attemptDownloadFuelstation,
         attemptDeleteFuelstation,
         serverFuelstationNotFoundUserAcknowledged,
         clearErrors } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import * as urls from "../urls"
import * as utils from "../utils"

class FuelstationDetailPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.fuelstation != null;
    }

    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const {
            markFuelstationForEdit,
            downloadFuelstation,
            clearErrors,
            userAcknowledgedNotFound,
            fuelstationIdNotFound,
            deleteFuelstation,
            becameUnauthenticated,
            deleteConfirmMessage
        } = this.props
        const fuelstationIdKey = "fpfuelstation/id"
        const fuelstationId = fuelstationPayload[fuelstationIdKey]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your gas station, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadFuelstation(fuelstationId)} />
        const entityForm = <FuelstationForm
                               markFuelstationForEdit={markFuelstationForEdit}
                               downloadFuelstation={downloadFuelstation}
                               deleteFuelstation={deleteFuelstation}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               fuelstationIdNotFound={fuelstationIdNotFound}
                               clearErrors={clearErrors}
                               fuelstationId={fuelstationId}
                               initialValues={toFuelstationFormModel(fuelstationPayload)}
                               deleteConfirmMessage={deleteConfirmMessage}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    entityType="gas station"
                    entitiesUri={urls.FUELSTATIONS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    let numGasLogs = utils.countDependents(state, "fplogs", "fplog/fuelstation-id", ownProps.params.fuelstationId)
    let deleteConfirmMessage
    if (numGasLogs > 0) {
        deleteConfirmMessage = [
            "This gas station has ",
            <strong key="numGasLogs">{numGasLogs}</strong>,
            " gas logs associated with it that would also be deleted.",
            <br key="spacer1" />,
            <br key="spacer2" />,
            "Are you sure you want to delete this gas station?"
        ]
    } else {
        deleteConfirmMessage = "Are you sure you want to delete this gas station record?"
    }
    return {
        fuelstation: state.serverSnapshot._embedded.fuelstations[ownProps.params.fuelstationId],
        becameUnauthenticated: state.becameUnauthenticated,
        deleteConfirmMessage: deleteConfirmMessage,
        fuelstationIdNotFound: state.api.fuelstationIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markFuelstationForEdit: (fuelstationId) => {
            toastr.clean()
            dispatch(markFuelstationForEdit(fuelstationId))
            dispatch(push(urls.fuelstationEditUrl(fuelstationId)))
        },
        downloadFuelstation: (fuelstationId) => {
            dispatch(attemptDownloadFuelstation(fuelstationId, urls.fuelstationDetailUrl(fuelstationId)))
        },
        deleteFuelstation: (fuelstationId) => {
            dispatch(attemptDeleteFuelstation(fuelstationId))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (fuelstationId) => {
            dispatch(serverFuelstationNotFoundUserAcknowledged(fuelstationId))
            dispatch(push(urls.FUELSTATIONS_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationDetailPage)
