import React from "react"
import { Table, Image } from "react-bootstrap"
import { Link } from "react-router"
import _ from "lodash"

export default class FuelstationsListTable extends React.Component {
    render() {
        return (
            <Table responsive stiped hover>
                <thead>
                    <tr>
                        <th>Gas Station Name</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                { (() => {
                    const { fuelstations, fuelstationRowOnClick } = this.props;
                    var rows = []
                      _.forOwn(fuelstations, (fuelstation, key) => {
                        rows.push(
                            <tr key={key}>
                                <td><Link to={"fuelstations/" + key}>{fuelstation.payload['fpfuelstation/name']}</Link></td>
                                <td onClick={() => fuelstationRowOnClick(key)}>
                                    <Image src={"/images/fstypes/thumbnails/fstype-" + fuelstation.payload['fpfuelstation/type-id'] + ".png"} responsive />
                                </td>
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
