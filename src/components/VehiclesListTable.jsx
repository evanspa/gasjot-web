import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router"
import _ from "lodash"

export default class AuthenticatedHomePage extends React.Component {
    render() {
        return (
            <Table responsive stiped hover>
                <thead>
                    <tr>
                        <th>Vehicle Name</th>
                        <th>Plate #</th>
                    </tr>
                </thead>
                <tbody>
                { (() => {
                    const { vehicles, vehicleRowOnClick } = this.props;
                    var rows = []
                    _.forOwn(vehicles, (vehicle, key) => {
                        rows.push(
                            <tr key={key}>
                                <td><Link to={"vehicles/" + key}>{vehicle.payload['fpvehicle/name']}</Link></td>
                                <td onClick={() => vehicleRowOnClick(key)}>{vehicle.payload['fpvehicle/plate']}</td>
                            </tr>
                        )
                    })
                    return rows;
                })()}
                </tbody>
            </Table>
        )
    }
}
