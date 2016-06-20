import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import OdometerLogForm from "../components/OdometerLogForm.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveOdometerLogFnMaker } from "../actions/actionCreators"
import { toOdometerLogFormModel } from "../utils"
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import * as utils from "../utils"

class OdometerLogEditPage extends React.Component {
    render() {
        const odometerLogPayload = this.props.odometerLog.payload
        const { cancelOdometerLogEdit,
                handleSubmit,
                api,
                becameUnauthenticated,
                vehicles
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const odometerLogId = odometerLogPayload["envlog/id"]
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your odometer log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(vehicles, odometerLogId)} />
        const entityForm = <OdometerLogForm
                               vehicles={vehicleDropdownValues}
                               cancelOdometerLogEdit={cancelOdometerLogEdit}
                               onSubmit={() => handleSubmit(vehicles, odometerLogId)}
                               requestInProgress={requestInProgress}
                               odometerLogId={odometerLogId}
                               initialValues={toOdometerLogFormModel(odometerLogPayload)}
                               editMode={true}
                               fpErrorMask={fpErrorMask} />
        return (<EntityEditDetailPage
                    editMode={true}
                    entityType="odometer log"
                    entitiesUri="/odometerLogs"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        odometerLog: state.serverSnapshot._embedded.envlogs[ownProps.params.odometerLogId],
        vehicles: state.serverSnapshot._embedded.vehicles,
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelOdometerLogEdit: (odometerLogId) => {
            toastr.clean()
            dispatch(push("/odometerLogs/" + odometerLogId))
        },
        handleSubmit: (vehicles, odometerLogId) => {
            toastr.clean()
            dispatch(attemptSaveOdometerLogFnMaker(vehicles)(odometerLogId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogEditPage)
