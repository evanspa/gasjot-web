import React from "react"
import { push } from 'react-router-redux'
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehiclesList from "../components/VehiclesList.jsx"
import FuelstationsList from "../components/FuelstationsList.jsx"
import _ from "lodash"

class FuelstationsPage extends React.Component {
    render() {
        const { fuelstations, fuelstationRowOnClick } = this.props
        return (
            <div>
                <GasJotHelmet title="Your Gas Stations" />
                <div class="container"><GasJotNavbar /></div>
                <Col xs={8} xsOffset={2}>
                    <Link to="/">&#8592; back</Link>
                    <h3 style={{paddingBottom: 5}}>Your Gas Stations</h3>
                    <FuelstationsList fuelstations={ fuelstations } fuelstationRowOnClick={ fuelstationRowOnClick } />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
FuelstationsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        fuelstations: state.serverSnapshot._embedded.fuelstations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fuelstationRowOnClick: (fuelstationId) => { dispatch(push("/fuelstations/" + fuelstationId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationsPage)
