import React from "react"
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from "react-bootstrap";
import _ from "lodash"
import * as urls from "../urls"

export default class Records extends React.Component {

    render() {
        const { onItemSelect,
                vehicleCount,
                fuelstationCount,
                odometerLogCount,
                gasLogCount
        } = this.props
        return (
            <div>
                <ListGroup>
                    <ListGroupItem header="Vehicles" onClick={() => onItemSelect(urls.VEHICLES_URI)}>
                        {vehicleCount} vehicle records.
                    </ListGroupItem>
                    <ListGroupItem header="Gas Stations" onClick={() => onItemSelect(urls.FUELSTATIONS_URI)}>
                        {fuelstationCount} gas station records.
                    </ListGroupItem>
                    <ListGroupItem header="Gas Logs" onClick={() => onItemSelect(urls.GAS_LOGS_URI)}>
                        {gasLogCount} gas log records.
                    </ListGroupItem>
                    <ListGroupItem header="Odometer Logs" onClick={() => onItemSelect(urls.ODOMETER_LOGS_URI)}>
                        {odometerLogCount} odometer log records.
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
