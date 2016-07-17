import React from "react"
import { push } from 'react-router-redux'
import { ButtonToolbar,
         Button,
         DropdownButton,
         MenuItem,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import GasJotNavbar from "../components/navbar.jsx"
import GasJotFooter from "../components/gasjot-footer.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import { destroy } from "redux-form"
import * as forms from "../forms"
import numeral from "numeral"
import PriceByOctaneChart from "../components/price-by-octane-chart.jsx"
import AddRecordButton from "../components/add-record-button.jsx"
import * as gvs from "../grid-vals"

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
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    {(() => {
                         if (vehicleCount == 0) {
                             return (
                                 <Panel header={<h4>No Vehicles Yet</h4>} bsStyle="success">
                                     <div>It looks like you don't have any vehicles defined yet.</div>
                                     <div style={{paddingTop: 15}}>Let's begin by adding your first vehicle.</div>
                                     <p style={{marginTop: 15}}>
                                         <Button bsStyle="primary" onClick={handleAddVehicle}>Add Vehicle</Button>
                                     </p>
                                 </Panel>
                             )
                         } else if (gasLogCount == 0 && odometerLogCount == 0) {
                             return (
                                 <Panel header={<h4>No Logs Yet</h4>} bsStyle="success">
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
                                         <AddRecordButton
                                             handleAddVehicle={handleAddVehicle}
                                             handleAddFuelstation={handleAddFuelstation}
                                             handleAddGasLog={handleAddGasLog}
                                             handleAddOdometerLog={handleAddOdometerLog} />
                                     </div>
                                     <h4>Price of Gas</h4>
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
                <GasJotFooter />
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
            dispatch(destroy(forms.VEHICLE_FORM))
            // the '?nextPathname' part isn't really needed, but leaving here to
            // serve as an example of how to achieve controlling what page to
            // navigate to in the event the user cancels from the 'add vehicle'
            // page, or is successful in creating a vehicle
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
