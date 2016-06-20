import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FuelstationForm from "../components/FuelstationForm.jsx"
import { markFuelstationForEdit, attemptDownloadFuelstation } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import * as urls from "../urls"

class FuelstationDetailPage extends React.Component {
    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const { markFuelstationForEdit, downloadFuelstation, becameUnauthenticated } = this.props
        const fuelstationIdKey = "fpfuelstation/id"
        const fuelstationId = fuelstationPayload[fuelstationIdKey]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your gas station, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadFuelstation(fuelstationId)} />
        const entityForm = <FuelstationForm
                               markFuelstationForEdit={markFuelstationForEdit}
                               downloadFuelstation={downloadFuelstation}
                               fuelstationId={fuelstationId}
                               initialValues={toFuelstationFormModel(fuelstationPayload)}
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
            dispatch(push(urls.fuelstationEditUrl(fuelstationId)))
        },
        downloadFuelstation: (fuelstationId) => {
            dispatch(attemptDownloadFuelstation(fuelstationId, urls.fuelstationDetailUrl(fuelstationId)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationDetailPage)
