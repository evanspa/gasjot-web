import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import FuelstationForm from "../components/FuelstationForm.jsx"
import { attemptSaveNewFuelstation } from "../actions/actionCreators"
import EntityAddPage from "../components/EntityAddPage.jsx"

class FuelstationAddPage extends React.Component {
    render() {
        const {
            cancelFuelstationAdd,
            handleSubmit,
            requestInProgress,
            backLink } = this.props
        const fuelstationForm = (<FuelstationForm
                                     cancelFuelstationEdit={cancelFuelstationAdd}
                                     onSubmit={() => handleSubmit()}
                                     requestInProgress={requestInProgress}
                                     editMode={true} />)
        return (
            <EntityAddPage
                entityType="gas station"
                backLink={backLink}
                entityForm={fuelstationForm}/>
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
        cancelFuelstationAdd: () => {
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                dispatch(goBack())
            }
        },
        handleSubmit: () => {
            dispatch(attemptSaveNewFuelstation(nextPathname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationAddPage)
