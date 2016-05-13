import React, { createClass } from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col } from "react-bootstrap";
import GasJotNavbar from "../components/NavBar.jsx"

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Dashboard" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={6} mdOffset={3}>
                    <p>This is the authenticated dashboard.</p>
                </Col>
            </div>
        );
    }
}
