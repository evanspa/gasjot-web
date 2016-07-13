import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import OdometerLogForm from "../components/odometer-log-form.jsx"
import { cancelRecordEdit, attemptSaveNewOdometerLogFnMaker } from "../actions/action-creators"
import EntityAddPage from "../components/entity-add-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { toastr } from 'react-redux-toastr'
import { destroy } from "redux-form"
import { ODOMETER_LOG_FORM, VEHICLE_FORM } from "../forms"
import * as utils from "../utils"
import * as urls from "../urls"

class OdometerLogAddPage extends React.Component {
    render() {
        const {
            cancelOdometerLogAdd,
            handleSubmit,
            becameUnauthenticated,
            api,
            vehicles,
            backLink,
            handleAddVehicle,
            recentlyAddedVehicle,
            destroyVehicleForm
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const odometerLogForm = (<OdometerLogForm
                                     destroyVehicleForm={destroyVehicleForm}
                                     vehicles={vehicleDropdownValues}
                                     cancelOdometerLogEdit={cancelOdometerLogAdd}
                                     onSubmit={() => handleSubmit(vehicles)}
                                     requestInProgress={requestInProgress}
                                     editMode={true}
                                     fpErrorMask={fpErrorMask} />)
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your odometer log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(vehicles)} />
        return (<EntityAddPage
                    entityType="odometer log"
                    backLink={backLink}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={odometerLogForm}/>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        vehicles: state.serverSnapshot._embedded.vehicles,
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { query } = ownProps.location
    let nextPathname = null
    if (query != null) {
        nextPathname = query.nextPathname
    }
    return {
        cancelOdometerLogAdd: () => {
            toastr.clean()
            dispatch(destroy(ODOMETER_LOG_FORM))
            dispatch(cancelRecordEdit())
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: (vehicles) => {
            console.log("odometer log  add handleSubmit invoked")
            toastr.clean()
            dispatch(attemptSaveNewOdometerLogFnMaker(vehicles)(nextPathname))
        },
        destroyVehicleForm: () => dispatch(destroy(VEHICLE_FORM))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogAddPage)
