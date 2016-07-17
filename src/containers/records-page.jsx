import React from "react"
import { push } from 'react-router-redux'
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import GasJotNavbar from "../components/navbar.jsx"
import GasJotFooter from "../components/gasjot-footer.jsx"
import Records from "../components/records.jsx"
import { destroy } from "redux-form"
import _ from "lodash"
import * as forms from "../forms"
import * as urls from "../urls"
import AddRecordButton from "../components/add-record-button.jsx"
import * as gvs from "../grid-vals"

class RecordsPage extends React.Component {
    render() {
        const {
            onItemSelect,
            vehicleCount,
            fuelstationCount,
            odometerLogCount,
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
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <div>
                        <AddRecordButton
                            handleAddVehicle={handleAddVehicle}
                            handleAddFuelstation={handleAddFuelstation}
                            handleAddGasLog={handleAddGasLog}
                            handleAddOdometerLog={handleAddOdometerLog} />
                    </div>
                    <h4 style={{marginTop: 20}}>Your Records</h4>
                    <p>From here you can drill into all of your Gas Jot data records.</p>
                    <Records
                        onItemSelect={onItemSelect}
                        vehicleCount={vehicleCount}
                        fuelstationCount={fuelstationCount}
                        odometerLogCount={odometerLogCount}
                        gasLogCount={gasLogCount} />
                </Col>
                <GasJotFooter />
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
        gasLogCount: _.size(state.serverSnapshot._embedded.fplogs)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemSelect: uri => dispatch(push(uri)),
        handleAddVehicle: () => {
            dispatch(destroy(forms.VEHICLE_FORM))
            dispatch(push(urls.ADD_VEHICLE_URI))
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage)
