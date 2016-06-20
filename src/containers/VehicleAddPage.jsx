import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import VehicleForm from "../components/VehicleForm.jsx"
import { attemptSaveNewVehicle } from "../actions/actionCreators"
import EntityAddPage from "../components/EntityAddPage.jsx"

class VehicleAddPage extends React.Component {
    render() {
        const {
            cancelVehicleAdd,
            handleSubmit,
            requestInProgress,
            backLink } = this.props
        const vehicleForm = (<VehicleForm
                                 cancelVehicleEdit={cancelVehicleAdd}
                                 onSubmit={() => handleSubmit()}
                                 requestInProgress={requestInProgress}
                                 editMode={true} />)
        return (
            <EntityAddPage
                entityType="vehicle"
                backLink={backLink}
                entityForm={vehicleForm}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requestInProgress: state.api.requestInProgress
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
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: () => {
            dispatch(attemptSaveNewVehicle(nextPathname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleAddPage)
