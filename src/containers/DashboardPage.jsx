import React, { createClass } from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col } from "react-bootstrap";

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Dashboard" />
                <Col md={6} mdOffset={3}>
                    <p>This is the authenticated dashboard.</p>
                </Col>
            </div>
        );
    }
}
