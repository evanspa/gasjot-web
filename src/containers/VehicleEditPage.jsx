import React from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Input, Button, Table, Col } from "react-bootstrap";
import { push } from 'react-router-redux'
import { Link } from "react-router"
import GasJotNavbar from "../components/NavBar.jsx"
import { connect } from 'react-redux'
import * as strs from "../strings"
import SmallModal from "../components/SmallModal.jsx"

class VehicleEditPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            modalTitle: null,
            modalContent: null
        };
    }

    render() {
        const vehiclePayload = this.props.vehicle.payload
        const { cancelVehicleEdit } = this.props
        let modalClose = () => this.setState({ showModal: false })
        const cancelButton = <Button style={{marginBottom: 10, marginRight: 10}} onClick={() => cancelVehicleEdit(vehiclePayload['fpvehicle/id'])}>Cancel</Button>
        const saveButton = <Button style={{marginBottom: 10}} bsStyle="success">Save</Button>
        return (
            <div>
                <GasJotHelmet title="Edit Vehicle" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={8} mdOffset={2}>
                    <Link to="/">back to vehicles</Link>
                    <h3>Edit Vehicle</h3>
                    { cancelButton }
                    { saveButton }
                    <SmallModal show={this.state.showModal} onHide={modalClose} title={this.state.modalTitle} content={this.state.modalContent} />
                    <form>
                        <Table bordered>
                            <colgroup>
                                <col width="40%"/>
                                <col width="60%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th className="entityFieldName">Name</th>
                                    <td><Input type="text" value={vehiclePayload['fpvehicle/name']} autoFocus /></td>
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
                                    <th className="entityFieldName"><a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mpg_readout_lbl, modalContent: strs.has_mpg_readout_explanation})}>{strs.has_mpg_readout_lbl}</a></th>
                                    <td>{vehiclePayload['fpvehicle/has-mpg-readout']}</td>
                                </tr>
                                <tr>
                                    <th className="entityFieldName"><a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_mph_readout_lbl, modalContent: strs.has_mph_readout_explanation})}>{strs.has_mph_readout_lbl}</a></th>
                                    <td>{vehiclePayload['fpvehicle/has-mph-readout']}</td>
                                </tr>
                                <tr>
                                    <th className="entityFieldName"><a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_dte_readout_lbl, modalContent: strs.has_dte_readout_explanation})}>{strs.has_dte_readout_lbl}</a></th>
                                    <td>{vehiclePayload['fpvehicle/has-dte-readout']}</td>
                                </tr>
                                <tr>
                                    <th className="entityFieldName"><a role="button" onClick={() => this.setState({showModal: true, modalTitle: strs.has_outside_temp_readout_lbl, modalContent: strs.has_outside_temp_readout_explanation})}>{strs.has_outside_temp_readout_lbl}</a></th>
                                    <td>{vehiclePayload['fpvehicle/has-outside-temp-readout']}</td>
                                </tr>
                                <tr>
                                    <th className="entityFieldName">Created at</th>
                                    <td>{vehiclePayload['fpvehicle/created-at']}</td>
                                </tr>
                                <tr>
                                    <th className="entityFieldName">Updated at</th>
                                    <td>{vehiclePayload['fpvehicle/updated-at']}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                    { cancelButton }
                    { saveButton }
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
        cancelVehicleEdit: (vehicleId) => {
            dispatch(push("/vehicles/" + vehicleId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEditPage)
