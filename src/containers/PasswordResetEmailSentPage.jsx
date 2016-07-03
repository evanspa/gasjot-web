import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"
import _ from "lodash"
import * as urls from "../urls"

export default class PasswordResetEmailSentPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Password Reset Email Sent" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel header={<h3>Password Reset Email Sent</h3>} bsStyle="success">
                        <div>You will receive an email shortly from Gas Jot containing a link you can use to reset your password.</div>
                    </Panel>
                </Col>
            </div>
        );
    }
}
