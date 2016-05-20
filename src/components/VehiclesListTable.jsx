import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router"
import _ from "lodash"
import moment from "moment"

export default class AuthenticatedHomePage extends React.Component {

    render() {
        /*const { vehicles } = this.props;
        var rows = []
        _.forOwn(vehicles, (vehicle, key) => {
            const createdAt = moment(vehicle.payload['fpvehicle/created-at'])
            const updatedAt = moment(vehicle.payload['fpvehicle/updated-at'])
            rows.push(
                <tr key={key}>
                    <td>{vehicle.payload['fpvehicle/name']}</td>
                    <td>{vehicle.payload['fpvehicle/plate']}</td>
                    <td>{vehicle.payload['fpvehicle/vin']}</td>
                    <td>{createdAt.format("MM-DD-YYYY, h:mm:ss a")}</td>
                    <td>{updatedAt.format("MM-DD-YYYY, h:mm:ss a")}</td>
                </tr>
            )
        })*/
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
                        const createdAt = moment(vehicle.payload['fpvehicle/created-at'])
                        const updatedAt = moment(vehicle.payload['fpvehicle/updated-at'])
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
