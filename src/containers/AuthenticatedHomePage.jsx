import React from "react"
import { push } from 'react-router-redux'
import { Col, Tabs, Tab } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehiclesList from "../components/VehiclesList.jsx"

class AuthenticatedHomePage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { key: 1 }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(key) {
        this.setState({key})
    }

    render() {
        const { vehicles, vehicleRowOnClick } = this.props
        return (
            <div>
                <GasJotHelmet title="Home" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={8} mdOffset={2}>
                    <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
                        <Tab eventKey={1} title="Vehicles">
                            <VehiclesList vehicles={ vehicles } vehicleRowOnClick={ vehicleRowOnClick } />
                        </Tab>
                        <Tab eventKey={2} title="Fuel Stations">Tab 2 content</Tab>
                        <Tab eventKey={3} title="Gas Logs">Tab 3 content</Tab>
                        <Tab eventKey={4} title="Odometer Logs">Tab 3 content</Tab>
                    </Tabs>
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
        vehicles: state.serverSnapshot._embedded.vehicles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vehicleRowOnClick: (vehicleId) => {
            dispatch(push("/vehicles/" + vehicleId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHomePage)
