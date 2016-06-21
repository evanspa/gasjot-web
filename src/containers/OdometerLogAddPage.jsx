import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import OdometerLogForm from "../components/OdometerLogForm.jsx"
import { cancelRecordEdit, attemptSaveNewOdometerLogFnMaker } from "../actions/actionCreators"
import EntityAddPage from "../components/EntityAddPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"
import { toastr } from 'react-redux-toastr'
import * as utils from "../utils"

class OdometerLogAddPage extends React.Component {
    render() {
        const {
            cancelOdometerLogAdd,
            handleSubmit,
            becameUnauthenticated,
            api,
            vehicles,
            backLink
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        const vehicleDropdownValues = utils.toDropdownValues(vehicles, "fpvehicle/id", "fpvehicle/name")
        const odometerLogForm = (<OdometerLogForm
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
            dispatch(cancelRecordEdit())
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: (vehicles) => {
            toastr.clean()
            dispatch(attemptSaveNewOdometerLogFnMaker(vehicles)(nextPathname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogAddPage)
