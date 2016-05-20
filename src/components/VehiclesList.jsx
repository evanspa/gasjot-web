import React from "react"
import _ from "lodash"
import { Label, Button } from "react-bootstrap"
import VehiclesListTable from "./VehiclesListTable.jsx"

export default class VehiclesList extends React.Component {
    render() {
        const numVehicles = _.keys(this.props.vehicles).length
        var inner;
        if (numVehicles > 0) {
            inner = <VehiclesListTable vehicles={this.props.vehicles}
                                       vehicleRowOnClick={this.props.vehicleRowOnClick} />
        } else {
            inner = <Label>You have no vehicles.</Label>
        }
        return (
            <div style={{marginTop: 15 }}>
                <Button style={{marginBottom: 10}} bsStyle="primary">Create Vehicle</Button>
                { inner }
            </div>
        )
    }
}