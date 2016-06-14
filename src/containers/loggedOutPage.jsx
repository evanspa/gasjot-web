import React, { createClass } from "react"
import { Col, Panel } from "react-bootstrap"
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"

export default class LoggedOutPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Logged Out" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel header={<h3>Logged Out</h3>} bsStyle="success">
                        You have been logged out successfully.
                    </Panel>
                </Col>
            </div>
        );
    }
}
