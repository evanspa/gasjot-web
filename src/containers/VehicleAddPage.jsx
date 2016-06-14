import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehicleForm from "../components/VehicleForm.jsx"
import { attemptSaveNewVehicle } from "../actions/actionCreators"

class VehicleAddPage extends React.Component {

    render() {
        const { cancelVehicleAdd, handleSubmit, requestInProgress, backLink } = this.props
        return (
            <div>
                <GasJotHelmet title="Add Vehicle" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    { backLink != null ? backLink : "" }
                    <h3 style={{paddingBottom: 5}}>Add Vehicle</h3>
                    <VehicleForm
                        cancelVehicleEdit={cancelVehicleAdd}
                        onSubmit={() => handleSubmit()}
                        requestInProgress={requestInProgress}
                        editMode={true} />
                </Col>
            </div>
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
    console.log("inside VehicleAddPage.mapDispatchToProps, nextPathname: [" + nextPathname + "]")
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
