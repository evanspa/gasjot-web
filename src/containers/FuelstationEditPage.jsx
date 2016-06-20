import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FuelstationForm from "../components/FuelstationForm.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveFuelstation } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import * as urls from "../urls"

class FuelstationEditPage extends React.Component {
    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const { cancelFuelstationEdit, handleSubmit, api, becameUnauthenticated } = this.props
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
                               fuelstationId={fuelstationId}
                               initialValues={toFuelstationFormModel(fuelstationPayload)}
                               editMode={true}
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
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelFuelstationEdit: (fuelstationId) => {
            toastr.clean()
            dispatch(push(urls.fuelstationDetailUrl(fuelstationId)))
        },
        handleSubmit: (fuelstationId) => {
            toastr.clean()
            dispatch(attemptSaveFuelstation(fuelstationId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationEditPage)
