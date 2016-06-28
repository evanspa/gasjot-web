import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import OdometerLogForm from "../components/OdometerLogForm.jsx"
import { markOdometerLogForEdit,
         attemptDownloadOdometerLog,
         attemptDeleteOdometerLog,
         serverOdometerLogNotFoundUserAcknowledged,
         clearErrors } from "../actions/actionCreators"
import { toOdometerLogFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"

class OdometerLogDetailPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.odometerLog != null;
    }

    render() {
        const odometerLogPayload = this.props.odometerLog.payload
        const {
            markOdometerLogForEdit,
            downloadOdometerLog,
            odometerLogIdNotFound,
            clearErrors,
            deleteOdometerLog,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            deleteConfirmMessage,
            vehicles
        } = this.props
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const odometerLogIdKey = "envlog/id"
        const odometerLogId = odometerLogPayload[odometerLogIdKey]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your odometer log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadOdometerLog(odometerLogId)} />
        const entityForm = <OdometerLogForm
                               vehicles={vehicleDropdownValues}
                               markOdometerLogForEdit={markOdometerLogForEdit}
                               downloadOdometerLog={downloadOdometerLog}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               odometerLogIdNotFound={odometerLogIdNotFound}
                               deleteOdometerLog={deleteOdometerLog}
                               odometerLogId={odometerLogId}
                               clearErrors={clearErrors}
                               initialValues={toOdometerLogFormModel(odometerLogPayload)}
                               deleteConfirmMessage={deleteConfirmMessage}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    entityType="odometer log"
                    entitiesUri={urls.ODOMETER_LOGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        odometerLog: state.serverSnapshot._embedded.envlogs[ownProps.params.odometerLogId],
        becameUnauthenticated: state.becameUnauthenticated,
        vehicles: state.serverSnapshot._embedded.vehicles,
        deleteConfirmMessage: "Are you sure you want to delete this odometer log?",
        odometerLogIdNotFound: state.api.odometerLogIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markOdometerLogForEdit: (odometerLogId) => {
            toastr.clean()
            dispatch(markOdometerLogForEdit(odometerLogId))
            dispatch(push(urls.odometerLogEditUrl(odometerLogId)))
        },
        downloadOdometerLog: (odometerLogId) => {
            dispatch(attemptDownloadOdometerLog(odometerLogId, urls.odometerLogDetailUrl(odometerLogId)))
        },
        deleteOdometerLog: (odometerLogId) => {
            dispatch(attemptDeleteOdometerLog(odometerLogId))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (odometerLogId) => {
            dispatch(serverOdometerLogNotFoundUserAcknowledged(odometerLogId))
            dispatch(push(urls.ODOMETER_LOGS_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogDetailPage)
