import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import VehicleForm from "../components/vehicle-form.jsx"
import { cancelRecordEdit,
         attemptSaveNewVehicle,
         clearErrors } from "../actions/action-creators"
import EntityAddPage from "../components/entity-add-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { destroy } from "redux-form"
import { VEHICLE_FORM } from "../forms"
import { toastr } from 'react-redux-toastr'

class VehicleAddPage extends React.Component {
    render() {
        const {
            cancelVehicleAdd,
            handleSubmit,
            becameUnauthenticated,
            api,
            clearErrors,
            backLink
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const vehicleForm = (<VehicleForm
                                 cancelVehicleEdit={cancelVehicleAdd}
                                 onSubmit={() => handleSubmit()}
                                 requestInProgress={requestInProgress}
                                 editMode={true}
                                 clearErrors={clearErrors}
                                 fpErrorMask={fpErrorMask} />)
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your vehicle, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit()} />
        return (
            <EntityAddPage
                entityType="vehicle"
                backLink={backLink}
                reauthenticateModal={reauthenticateModal}
                entityForm={vehicleForm}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
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
        cancelVehicleAdd: () => {
            toastr.clean()
            dispatch(destroy(VEHICLE_FORM))
            dispatch(cancelRecordEdit())
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSaveNewVehicle(nextPathname))
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleAddPage)
