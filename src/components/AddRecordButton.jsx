import React from "react"
import { DropdownButton, MenuItem } from "react-bootstrap";

export default class AddRecordButton extends React.Component {
    render() {
        const {
            handleAddVehicle,
            handleAddFuelstation,
            handleAddGasLog,
            handleAddOdometerLog
        } = this.props
        return (
            <DropdownButton bsSize="large" title="Add Record" id="dropdown-size-large">
                <MenuItem eventKey="1" onClick={handleAddGasLog}>Gas Purchase Log</MenuItem>
                <MenuItem eventKey="2" onClick={handleAddOdometerLog}>Odometer Log</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3" onClick={handleAddVehicle}>Vehicle</MenuItem>
                <MenuItem eventKey="4" onClick={handleAddFuelstation}>Gas Station</MenuItem>
            </DropdownButton>
        )
    }
}
