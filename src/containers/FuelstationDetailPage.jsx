import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import FuelstationForm from "../components/FuelstationForm.jsx"
import { markFuelstationForEdit } from "../actions/actionCreators"

class FuelstationDetailPage extends React.Component {
    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const { markFuelstationForEdit } = this.props
        return (
            <div>
                <GasJotHelmet title="Gas Station Detail Page" />
                <div className="container"><GasJotNavbar /></div>
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <Link to="/fuelstations">&#8592; back to gas stations</Link>
                    <h3 style={{paddingBottom: 5}}>Gas Station Details</h3>
                    <FuelstationForm
                        markFuelstationForEdit={markFuelstationForEdit}
                        fuelstationPayload={fuelstationPayload}
                        editMode={false} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        fuelstation: state.serverSnapshot._embedded.fuelstations[ownProps.params.fuelstationId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markFuelstationForEdit: (fuelstationId) => {
            dispatch(markFuelstationForEdit(fuelstationId))
            dispatch(push("/fuelstations/" + fuelstationId + "/edit"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationDetailPage)
