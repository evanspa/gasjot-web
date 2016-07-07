import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import GasLogForm from "../components/GasLogForm.jsx"
import { cancelRecordEdit,
         attemptSaveNewGasLogFnMaker,
         clearErrors } from "../actions/actionCreators"
import EntityAddPage from "../components/EntityAddPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import { destroy } from "redux-form"
import { GAS_LOG_FORM } from "../forms"
import { toastr } from 'react-redux-toastr'
import * as utils from "../utils"

class GasLogAddPage extends React.Component {
    render() {
        const {
            cancelGasLogAdd,
            handleSubmit,
            becameUnauthenticated,
            api,
            vehicles,
            fuelstations,
            clearErrors,
            backLink
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const fuelstationDropdownValues = utils.toDropdownValues(fuelstations, "fpfuelstation/id", "fpfuelstation/name")
        const gasLogForm = (<GasLogForm
                                vehicles={vehicleDropdownValues}
                                fuelstations={fuelstationDropdownValues}
                                cancelGasLogEdit={cancelGasLogAdd}
                                onSubmit={() => handleSubmit(vehicles, fuelstations)}
                                requestInProgress={requestInProgress}
                                editMode={true}
                                clearErrors={clearErrors}
                                fpErrorMask={fpErrorMask} />)
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your gas log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(vehicles, fuelstations)} />
        return (<EntityAddPage
                    entityType="gas log"
                    backLink={backLink}
                    reauthenticateModal={reauthenticateModal}
                    entityForm={gasLogForm}/>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        vehicles: state.serverSnapshot._embedded.vehicles,
        fuelstations: state.serverSnapshot._embedded.fuelstations,
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
        cancelGasLogAdd: () => {
            toastr.clean()
            dispatch(destroy(GAS_LOG_FORM))
            dispatch(cancelRecordEdit())
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: (vehicles, fuelstations) => {
            toastr.clean()
            dispatch(attemptSaveNewGasLogFnMaker(vehicles, fuelstations)(nextPathname))
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasLogAddPage)
