import React, { createClass } from "react"
import GasJotHelmet from "./common/gasjot-helmet.jsx";
import { Col } from "react-bootstrap";

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Not Found" />
                <Col md={6} mdOffset={3}>
                    <p>Page not found.</p>
                </Col>
            </div>
        );
    }
}
