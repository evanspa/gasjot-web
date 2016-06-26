import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasLogForm from "../components/GasLogForm.jsx"
import { markGasLogForEdit,
         attemptDownloadGasLog,
         attemptDeleteGasLog } from "../actions/actionCreators"
import { toGasLogFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"

class GasLogDetailPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.gasLog != null;
    }

    render() {
        const gasLogPayload = this.props.gasLog.payload
        const {
            markGasLogForEdit,
            downloadGasLog,
            deleteGasLog,
            becameUnauthenticated,
            deleteConfirmMessage,
            vehicles,
            fuelstations
        } = this.props
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const fuelstationDropdownValues = utils.toDropdownValues(fuelstations, "fpfuelstation/id", "fpfuelstation/name")
        const gasLogIdKey = "fplog/id"
        const gasLogId = gasLogPayload[gasLogIdKey]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your gas log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadGasLog(gasLogId)} />
        const entityForm = <GasLogForm
                               vehicles={vehicleDropdownValues}
                               fuelstations={fuelstationDropdownValues}
                               markGasLogForEdit={markGasLogForEdit}
                               downloadGasLog={downloadGasLog}
                               deleteGasLog={deleteGasLog}
                               gasLogId={gasLogId}
                               initialValues={toGasLogFormModel(gasLogPayload)}
                               deleteConfirmMessage={deleteConfirmMessage}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    entityType="gas log"
                    entitiesUri={urls.GAS_LOGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        gasLog: state.serverSnapshot._embedded.fplogs[ownProps.params.gasLogId],
        becameUnauthenticated: state.becameUnauthenticated,
        vehicles: state.serverSnapshot._embedded.vehicles,
        fuelstations: state.serverSnapshot._embedded.fuelstations,
        deleteConfirmMessage: "Are you sure you want to delete this gas log?"
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markGasLogForEdit: (gasLogId) => {
            toastr.clean()
            dispatch(markGasLogForEdit(gasLogId))
            dispatch(push(urls.gasLogEditUrl(gasLogId)))
        },
        downloadGasLog: (gasLogId) => {
            dispatch(attemptDownloadGasLog(gasLogId, urls.gasLogDetailUrl(gasLogId)))
        },
        deleteGasLog: (gasLogId) => {
            dispatch(attemptDeleteGasLog(gasLogId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasLogDetailPage)
