import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import OdometerLogForm from "../components/OdometerLogForm.jsx"
import { markOdometerLogForEdit, attemptDownloadOdometerLog } from "../actions/actionCreators"
import { toOdometerLogFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import _ from "lodash"
import * as utils from "../utils"

class OdometerLogDetailPage extends React.Component {
    render() {
        const odometerLogPayload = this.props.odometerLog.payload
        const { markOdometerLogForEdit,
                downloadOdometerLog,
                becameUnauthenticated,
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
                               odometerLogId={odometerLogId}
                               initialValues={toOdometerLogFormModel(odometerLogPayload)}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    entityType="odometer log"
                    entitiesUri="/odometerLogs"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        odometerLog: state.serverSnapshot._embedded.envlogs[ownProps.params.odometerLogId],
        becameUnauthenticated: state.becameUnauthenticated,
        vehicles: state.serverSnapshot._embedded.vehicles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markOdometerLogForEdit: (odometerLogId) => {
            toastr.clean()
            dispatch(markOdometerLogForEdit(odometerLogId))
            dispatch(push("/odometerLogs/" + odometerLogId + "/edit"))
        },
        downloadOdometerLog: (odometerLogId) => {
            dispatch(attemptDownloadOdometerLog(odometerLogId, "/odometerLogs/" + odometerLogId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogDetailPage)
