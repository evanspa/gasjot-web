import React from "react"
import { push } from 'react-router-redux'
import { Row, Col, Tabs } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import VehiclesList from "../components/VehiclesList.jsx"
import FuelstationsList from "../components/FuelstationsList.jsx"
import _ from "lodash"

class VehiclesPage extends React.Component {
    render() {
        const { vehicles, vehicleRowOnClick, handleAddVehicle } = this.props
        return (
            <div>
                <GasJotHelmet title="Your Vehicles" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <Link to="/">&#8592; back</Link>
                    <h3 style={{paddingBottom: 5}}>Your Vehicles</h3>
                    <VehiclesList vehicles={ vehicles }
                                  handleAddVehicle={ handleAddVehicle }
                                  vehicleRowOnClick={ vehicleRowOnClick } />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
VehiclesPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        vehicles: state.serverSnapshot._embedded.vehicles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vehicleRowOnClick: (vehicleId) => { dispatch(push("/vehicles/" + vehicleId)) },
        handleAddVehicle : () => { dispatch(push("/addVehicle")) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesPage)
