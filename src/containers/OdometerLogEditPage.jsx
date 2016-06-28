import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import OdometerLogForm from "../components/OdometerLogForm.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveOdometerLogFnMaker,
         serverOdometerLogNotFoundUserAcknowledged } from "../actions/actionCreators"
import { toOdometerLogFormModel } from "../utils"
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import * as utils from "../utils"
import * as urls from "../urls"

class OdometerLogEditPage extends React.Component {
    render() {
        const odometerLogPayload = this.props.odometerLog.payload
        const {
            cancelOdometerLogEdit,
            handleSubmit,
            api,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            odometerLogIdNotFound,
            vehicles
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const odometerLogId = odometerLogPayload["envlog/id"]
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const entityForm = <OdometerLogForm
                               vehicles={vehicleDropdownValues}
                               cancelOdometerLogEdit={cancelOdometerLogEdit}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               odometerLogIdNotFound={odometerLogIdNotFound}
                               onSubmit={() => handleSubmit(vehicles, odometerLogId)}
                               requestInProgress={requestInProgress}
                               odometerLogId={odometerLogId}
                               initialValues={toOdometerLogFormModel(odometerLogPayload)}
                               editMode={true}
                               fpErrorMask={fpErrorMask} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your odometer log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(vehicles, odometerLogId)} />
        return (<EntityEditDetailPage
                    editMode={true}
                    entityType="odometer log"
                    entitiesUri={urls.ODOMETER_LOGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        odometerLog: state.serverSnapshot._embedded.envlogs[ownProps.params.odometerLogId],
        vehicles: state.serverSnapshot._embedded.vehicles,
        becameUnauthenticated: state.becameUnauthenticated,
        odometerLogIdNotFound: state.api.odometerLogIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelOdometerLogEdit: (odometerLogId) => {
            toastr.clean()
            dispatch(push(urls.odometerLogDetailUrl(odometerLogId)))
        },
        handleSubmit: (vehicles, odometerLogId) => {
            toastr.clean()
            dispatch(attemptSaveOdometerLogFnMaker(vehicles)(odometerLogId));
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (odometerLogId) => {
            dispatch(serverOdometerLogNotFoundUserAcknowledged(odometerLogId))
            dispatch(push(urls.ODOMETER_LOGS_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogEditPage)
