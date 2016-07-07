import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FuelstationForm from "../components/FuelstationForm.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveFuelstation,
         clearErrors,
         serverFuelstationNotFoundUserAcknowledged } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import * as urls from "../urls"
import { destroy } from "redux-form"
import { GAS_STATION_FORM } from "../forms"

class FuelstationEditPage extends React.Component {
    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const {
            cancelFuelstationEdit,
            handleSubmit,
            api,
            clearErrors,
            userAcknowledgedNotFound,
            fuelstationIdNotFound,
            becameUnauthenticated
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const fuelstationId = fuelstationPayload["fpfuelstation/id"]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your gas station, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(fuelstationId)} />
        const entityForm = <FuelstationForm
                               cancelFuelstationEdit={cancelFuelstationEdit}
                               onSubmit={() => handleSubmit(fuelstationId)}
                               requestInProgress={requestInProgress}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               fuelstationIdNotFound={fuelstationIdNotFound}
                               fuelstationId={fuelstationId}
                               initialValues={toFuelstationFormModel(fuelstationPayload)}
                               editMode={true}
                               clearErrors={clearErrors}
                               fpErrorMask={fpErrorMask} />
        return (<EntityEditDetailPage
                    editMode={true}
                    entityType="gas station"
                    entitiesUri={urls.FUELSTATIONS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        fuelstation: state.serverSnapshot._embedded.fuelstations[ownProps.params.fuelstationId],
        becameUnauthenticated: state.becameUnauthenticated,
        fuelstationIdNotFound: state.api.fuelstationIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelFuelstationEdit: (fuelstationId) => {
            toastr.clean()
            dispatch(destroy(GAS_STATION_FORM))
            dispatch(push(urls.fuelstationDetailUrl(fuelstationId)))
        },
        handleSubmit: (fuelstationId) => {
            toastr.clean()
            dispatch(attemptSaveFuelstation(fuelstationId));
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (fuelstationId) => {
            dispatch(serverFuelstationNotFoundUserAcknowledged(fuelstationId))
            dispatch(push(urls.FUELSTATIONS_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationEditPage)
