import React from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Button, Table, Col } from "react-bootstrap";
import { Link } from "react-router"
import GasJotNavbar from "../components/NavBar.jsx"
import { connect } from 'react-redux'
import moment from "moment"

class VehicleDetailPage extends React.Component {
    render() {
        const vehiclePayload = this.props.vehicle.payload
        const createdAt = moment(vehiclePayload['fpvehicle/created-at'])
        const updatedAt = moment(vehiclePayload['fpvehicle/updated-at'])
        return (
            <div>
                <GasJotHelmet title="Vehicle Detail Page" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={8} mdOffset={2}>
                    <Link to="/">back to vehicles</Link>
                    <h3>Vehicle Details</h3>
                    <Button style={{marginBottom: 10}} bsStyle="primary">Edit</Button>
                    <Table bordered>
                        <colgroup>
                            <col width="40%"/>
                            <col width="60%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th className="entityFieldName">Name</th>
                                <td>{vehiclePayload['fpvehicle/name']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Plate #</th>
                                <td>{vehiclePayload['fpvehicle/plate']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">VIN</th>
                                <td>{vehiclePayload['fpvehicle/vin']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Fuel capacity</th>
                                <td>{vehiclePayload['fpvehicle/fuel-capacity']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Default octane</th>
                                <td>{vehiclePayload['fpvehicle/default-octane']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Takes diesel?</th>
                                <td>{vehiclePayload['fpvehicle/is-diesel']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Has MPG readout?</th>
                                <td>{vehiclePayload['fpvehicle/has-mpg-readout']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Has MPH readout?</th>
                                <td>{vehiclePayload['fpvehicle/has-mph-readout']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Has range (DTE) readout?</th>
                                <td>{vehiclePayload['fpvehicle/has-dte-readout']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Has outside temp readout?</th>
                                <td>{vehiclePayload['fpvehicle/has-outside-temp-readout']}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Created at</th>
                                <td>{createdAt.format("MM/DD/YYYY h:mm:ss a")}</td>
                            </tr>
                            <tr>
                                <th className="entityFieldName">Updated at</th>
                                <td>{updatedAt.format("MM/DD/YYYY h:mm:ss a")}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        vehicle: state.serverSnapshot._embedded.vehicles[ownProps.params.vehicleId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (usernameOrEmail, password, nextSuccessPathname) => {
            dispatch(attemptLogin(usernameOrEmail, password, nextSuccessPathname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailPage)