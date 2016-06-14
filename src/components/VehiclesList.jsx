import React from "react"
import _ from "lodash"
import { Label, Button } from "react-bootstrap"
import VehiclesListTable from "./VehiclesListTable.jsx"

export default class VehiclesList extends React.Component {
    render() {
        const numVehicles = _.keys(this.props.vehicles).length
        const { handleAddVehicle } = this.props
        var inner;
        if (numVehicles > 0) {
            inner = <VehiclesListTable vehicles={this.props.vehicles}
                                       vehicleRowOnClick={this.props.vehicleRowOnClick} />
        } else {
            inner = <div style={{marginTop: 15}}>You currently have no vehicles.</div>
        }
        return (
            <div style={{marginTop: 15 }}>
                <Button style={{marginBottom: 10}} bsStyle="primary" onClick={handleAddVehicle}>Add Vehicle</Button>
                { inner }
            </div>
        )
    }
}
