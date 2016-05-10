import React, { createClass } from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col } from "react-bootstrap";
import GasJotNavbar from "../components/NavBar.jsx"

export default class LoggedOutPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Logged Out" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={6} mdOffset={3}>
                    <p>You have been logged out successfully.</p>
                </Col>
            </div>
        );
    }
}
