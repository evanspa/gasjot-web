import React from "react"
import { push } from 'react-router-redux'
import { ButtonToolbar,
         DropdownButton,
         MenuItem,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import Records from "../components/Records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import { destroy } from "redux-form"
import * as forms from "../forms"
import numeral from "numeral"
import PriceByOctaneChart from "../components/PriceByOctaneChart.jsx"

class AuthenticatedHomePage extends React.Component {
    render() {
        const {
            vehicleCount,
            fuelstationCount,
            odometerLogCount,
            gasLogs,
            gasLogCount,
            handleAddVehicle,
            handleAddFuelstation,
            handleAddGasLog,
            handleAddOdometerLog
        } = this.props
        return (

            <div>
                <GasJotHelmet title="Home" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    {(() => {
                         if (vehicleCount == 0) {
                             return (
                                 <Panel header={<h3>No Vehicles Yet</h3>} bsStyle="success">
                                     <div>It looks like you don't have any vehicles defined yet.</div>
                                     <div style={{paddingTop: 15}}>Let's begin by adding your first vehicle.</div>
                                     <p style={{marginTop: 15}}>
                                         <Button bsStyle="primary" onClick={handleAddVehicle}>Add Vehicle</Button>
                                     </p>
                                 </Panel>
                             )
                         } else if (gasLogCount == 0 && odometerLogCount == 0) {
                             return (
                                 <Panel header={<h3>No Logs Yet</h3>} bsStyle="success">
                                     <div>You have {vehicleCount > 1 ? "some vehicles" : "a vehicle"} defined, but you don't yet have any logs created.</div>
                                     <div style={{paddingTop: 15}}>Get your data going by start logging your gas purchases, or just logging some of your odometer readings.</div>
                                     <p style={{marginTop: 15}}>
                                         <Button bsStyle="primary" onClick={handleAddGasLog}>Add Gas Log</Button>
                                         <br />
                                         <Button style={{marginTop: 10}} bsStyle="primary" onClick={handleAddOdometerLog}>Add Odometer Log</Button>
                                     </p>
                                 </Panel>
                             )
                         } else {
                             return (
                                 <div>
                                     <div>
                                         <DropdownButton bsSize="large" title="Add Record" id="dropdown-size-large">
                                             <MenuItem eventKey="1" onClick={handleAddGasLog}>Gas Purchase Log</MenuItem>
                                             <MenuItem eventKey="2" onClick={handleAddOdometerLog}>Odometer Log</MenuItem>
                                             <MenuItem divider />
                                             <MenuItem eventKey="3" onClick={handleAddVehicle}>Vehicle</MenuItem>
                                             <MenuItem eventKey="4" onClick={handleAddFuelstation}>Gas Station</MenuItem>
                                         </DropdownButton>
                                     </div>
                                     <h3>Price of Gas</h3>
                                     <p style={{marginBottom: 10}}>The following are a set of charts plotting the price of gas for the set of octanes that you've purchased over your set of vehicles.</p>
                                     {
                                         (() => {
                                             let octaneCharts = []
                                             let uniqueOctanes = utils.uniqueOctanes(gasLogs)
                                             for (let i = 0; i < uniqueOctanes.length; i++) {
                                                 octaneCharts.push(
                                                     <div key={i} style={{marginTop: 15}}>
                                                         <PriceByOctaneChart gasLogs={gasLogs} octane={uniqueOctanes[i]} />
                                                     </div>
                                                 )
                                             }
                                             return (<div>{octaneCharts}</div>)
                                         })()
                                     }
                                 </div>
                             )
                         }
                     }
                     )()
                    }
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
        odometerLogCount: _.size(state.serverSnapshot._embedded.envlogs),
        gasLogs: state.serverSnapshot._embedded.fplogs,
        gasLogCount: _.size(state.serverSnapshot._embedded.fplogs),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddVehicle: () => {
            //dispatch(destroy(forms.VEHICLE_FORM))
            dispatch(push(urls.ADD_VEHICLE_URI + "?nextPathname=" + urls.ROOT_URI))
        },
        handleAddFuelstation: () => {
            dispatch(destroy(forms.GAS_STATION_FORM))
            dispatch(push(urls.ADD_FUELSTATION_URI))
        },
        handleAddOdometerLog: () => {
            dispatch(destroy(forms.ODOMETER_LOG_FORM))
            dispatch(push(urls.ADD_ODOMETER_LOG_URI))
        },
        handleAddGasLog: () => {
            dispatch(destroy(forms.GAS_LOG_FORM))
            dispatch(push(urls.ADD_GAS_LOG_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHomePage)
