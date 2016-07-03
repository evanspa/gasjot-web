import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"
import _ from "lodash"
import * as urls from "../urls"

export default class ResetPasswordSuccessPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Password Reset Successful" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel header={<h3>Password Reset Successful</h3>} bsStyle="success">
                        <div>Your password has been reset.</div>
                        <div style={{paddingTop: 15}}>
                            <Link to={urls.LOGIN_URI}>Click here to log in.</Link>
                        </div>
                    </Panel>
                </Col>
            </div>
        );
    }
}
