import React from "react"
import { push } from 'react-router-redux'
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehiclesList from "../components/VehiclesList.jsx"
import FuelstationsList from "../components/FuelstationsList.jsx"
import _ from "lodash"

class AuthenticatedHomePage extends React.Component {
    render() {
        const { onItemSelect, vehicleCount, fuelstationCount } = this.props
        return (
            <div>
                <GasJotHelmet title="Home" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={8} mdOffset={2}>
                    <ListGroup>
                        <ListGroupItem header="Vehicles" onClick={() => onItemSelect("/vehicles")}>
                            {vehicleCount} vehicle records.
                        </ListGroupItem>
                        <ListGroupItem header="Gas Stations" onClick={() => onItemSelect("/fuelstations")}>
                            {fuelstationCount} gas station records.
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
AuthenticatedHomePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        vehicleCount: _.size(state.serverSnapshot._embedded.vehicles),
        fuelstationCount: _.size(state.serverSnapshot._embedded.fuelstations)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemSelect: uri => dispatch(push(uri))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHomePage)
