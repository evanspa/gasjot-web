import React from "react"
import _ from "lodash"
import { Label, Button } from "react-bootstrap"
import FuelstationsListTable from "./FuelstationsListTable.jsx"

export default class FuelstationsList extends React.Component {
    render() {
        const numFuelstations = _.keys(this.props.fuelstations).length
        var inner;
        if (numFuelstations > 0) {
            inner = <FuelstationsListTable fuelstations={this.props.fuelstations}
                                           fuelstationRowOnClick={this.props.fuelstationRowOnClick} />
        } else {
            inner = <Label>You have no gas stations.</Label>
        }
        return (
            <div style={{marginTop: 15 }}>
                <Button style={{marginBottom: 10}} bsStyle="primary">Add Gas Station</Button>
                { inner }
            </div>
        )
    }
}
