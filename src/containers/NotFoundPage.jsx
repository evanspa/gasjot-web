import React, { createClass } from "react"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col } from "react-bootstrap";
import GasJotNavbar from "../components/NavBar.jsx"

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Not Found" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={6} mdOffset={3}>
                    <p>Page not found.</p>
                </Col>
            </div>
        );
    }
}
