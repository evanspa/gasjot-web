import React from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasLogForm from "../components/GasLogForm.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveGasLogFnMaker,
         clearErrors,
         serverGasLogNotFoundUserAcknowledged } from "../actions/actionCreators"
import { toGasLogFormModel } from "../utils"
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import { destroy } from "redux-form"
import { GAS_LOG_FORM, VEHICLE_FORM, GAS_STATION_FORM } from "../forms"
import * as utils from "../utils"
import * as urls from "../urls"

class GasLogEditPage extends React.Component {
    render() {
        const gasLogPayload = this.props.gasLog.payload
        const {
            cancelGasLogEdit,
            handleSubmit,
            api,
            becameUnauthenticated,
            gasLogIdNotFound,
            userAcknowledgedNotFound,
            vehicles,
            clearErrors,
            fuelstations,
            destroyVehicleForm,
            destroyFuelstationForm
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const gasLogId = gasLogPayload["fplog/id"]
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const fuelstationDropdownValues = utils.toDropdownValues(fuelstations, "fpfuelstation/id", "fpfuelstation/name")
        const entityForm = <GasLogForm
                               destroyVehicleForm={destroyVehicleForm}
                               destroyFuelstationForm={destroyFuelstationForm}
                               vehicles={vehicleDropdownValues}
                               fuelstations={fuelstationDropdownValues}
                               cancelGasLogEdit={cancelGasLogEdit}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               gasLogIdNotFound={gasLogIdNotFound}
                               onSubmit={() => handleSubmit(vehicles, fuelstations, gasLogId)}
                               requestInProgress={requestInProgress}
                               gasLogId={gasLogId}
                               initialValues={toGasLogFormModel(gasLogPayload)}
                               editMode={true}
                               clearErrors={clearErrors}
                               fpErrorMask={fpErrorMask} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your gas log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(vehicles, fuelstations, gasLogId)} />
        return (<EntityEditDetailPage
                    editMode={true}
                    entityType="gas log"
                    entitiesUri={urls.GAS_LOGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        gasLog: state.serverSnapshot._embedded.fplogs[ownProps.params.gasLogId],
        vehicles: state.serverSnapshot._embedded.vehicles,
        fuelstations: state.serverSnapshot._embedded.fuelstations,
        becameUnauthenticated: state.becameUnauthenticated,
        gasLogIdNotFound: state.api.gasLogIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelGasLogEdit: (gasLogId) => {
            toastr.clean()
            dispatch(destroy(GAS_LOG_FORM))
            dispatch(push(urls.gasLogDetailUrl(gasLogId)))
        },
        handleSubmit: (vehicles, fuelstations, gasLogId) => {
            toastr.clean()
            dispatch(attemptSaveGasLogFnMaker(vehicles, fuelstations)(gasLogId));
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (gasLogId) => {
            dispatch(serverGasLogNotFoundUserAcknowledged(gasLogId))
            dispatch(push(urls.GAS_LOGS_URI))
        },
        destroyVehicleForm: () => dispatch(destroy(VEHICLE_FORM)),
        destroyFuelstationForm: () => dispatch(destroy(GAS_STATION_FORM))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasLogEditPage)
