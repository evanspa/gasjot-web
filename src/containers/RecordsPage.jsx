import React from "react"
import { push } from 'react-router-redux'
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import Records from "../components/Records.jsx"
import _ from "lodash"
import * as urls from "../urls"

class RecordsPage extends React.Component {
    render() {
        const { onItemSelect,
                vehicleCount,
                fuelstationCount,
                odometerLogCount,
                gasLogCount
        } = this.props
        return (
            <div>
                <GasJotHelmet title="Home" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <h3>Your Records</h3>
                    <Records
                        onItemSelect={onItemSelect}
                        vehicleCount={vehicleCount}
                        fuelstationCount={fuelstationCount}
                        odometerLogCount={odometerLogCount}
                        gasLogCount={gasLogCount} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
RecordsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        vehicleCount: _.size(state.serverSnapshot._embedded.vehicles),
        fuelstationCount: _.size(state.serverSnapshot._embedded.fuelstations),
        odometerLogCount: _.size(state.serverSnapshot._embedded.envlogs),
        gasLogCount: _.size(state.serverSnapshot._embedded.fplogs),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemSelect: uri => dispatch(push(uri))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage)
