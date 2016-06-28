import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import FuelstationForm from "../components/FuelstationForm.jsx"
import { cancelRecordEdit,
         attemptSaveNewFuelstation,
         clearErrors } from "../actions/actionCreators"
import EntityAddPage from "../components/EntityAddPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import { toastr } from 'react-redux-toastr'

class FuelstationAddPage extends React.Component {
    render() {
        const {
            cancelFuelstationAdd,
            handleSubmit,
            becameUnauthenticated,
            api,
            clearErrors,
            backLink
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const fuelstationForm = (<FuelstationForm
                                     cancelFuelstationEdit={cancelFuelstationAdd}
                                     onSubmit={() => handleSubmit()}
                                     requestInProgress={requestInProgress}
                                     editMode={true}
                                     clearErrors={clearErrors}
                                     fpErrorMask={fpErrorMask} />)
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your gas station, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit()} />
        return (
            <EntityAddPage
                entityType="gas station"
                backLink={backLink}
                reauthenticateModal={reauthenticateModal}
                entityForm={fuelstationForm}/>
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
        cancelFuelstationAdd: () => {
            toastr.clean()
            dispatch(cancelRecordEdit())
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSaveNewFuelstation(nextPathname))
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationAddPage)
