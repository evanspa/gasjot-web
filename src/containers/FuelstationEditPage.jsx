import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import FuelstationForm from "../components/FuelstationForm.jsx"
import { attemptSaveFuelstation } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"

class FuelstationEditPage extends React.Component {

    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const { cancelFuelstationEdit, handleSubmit, requestInProgress } = this.props
        return (
            <div>
                <GasJotHelmet title="Edit Gas Station Page" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <Link to="/fuelstations">&#8592; your gas stations</Link>
                    <h3 style={{paddingBottom: 5}}>Edit Gas Station</h3>
                    <FuelstationForm
                        cancelFuelstationEdit={cancelFuelstationEdit}
                        onSubmit={() => handleSubmit(fuelstationPayload['fpfuelstation/id'])}
                        requestInProgress={requestInProgress}
                        fuelstationId={fuelstationPayload["fpfuelstation/id"]}
                        initialValues={toFuelstationFormModel(fuelstationPayload)}
                        editMode={true} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requestInProgress: state.api.requestInProgress,
        fuelstation: state.serverSnapshot._embedded.fuelstations[ownProps.params.fuelstationId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelFuelstationEdit: (fuelstationId) => { dispatch(push("/fuelstations/" + fuelstationId)) },
        handleSubmit: (fuelstationId) => {
            dispatch(attemptSaveFuelstation(fuelstationId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationEditPage)
