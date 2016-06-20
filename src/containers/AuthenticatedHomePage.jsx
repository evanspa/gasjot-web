import React from "react"
import { push } from 'react-router-redux'
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import _ from "lodash"
import * as urls from "../urls"

class AuthenticatedHomePage extends React.Component {
    render() {
        const { onItemSelect,
                vehicleCount,
                fuelstationCount,
                odometerLogCount
        } = this.props
        return (
            <div>
                <GasJotHelmet title="Home" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <ListGroup>
                        <ListGroupItem header="Vehicles" onClick={() => onItemSelect(urls.VEHICLES_URI)}>
                            {vehicleCount} vehicle records.
                        </ListGroupItem>
                        <ListGroupItem header="Gas Stations" onClick={() => onItemSelect(urls.FUELSTATIONS_URI)}>
                            {fuelstationCount} gas station records.
                        </ListGroupItem>
                        <ListGroupItem header="Odometer Logs" onClick={() => onItemSelect("/odometerLogs")}>
                            {odometerLogCount} odometer log records.
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
        fuelstationCount: _.size(state.serverSnapshot._embedded.fuelstations),
        odometerLogCount: _.size(state.serverSnapshot._embedded.envlogs)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemSelect: uri => dispatch(push(uri))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHomePage)
