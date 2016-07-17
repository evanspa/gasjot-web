import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/gasjot-helmet.jsx"
import GasJotNavbar from "../components/navbar.jsx"
import GasJotFooter from "../components/gasjot-footer.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default class PasswordResetEmailSentPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Password Reset Email Sent" />
                <GasJotNavbar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Password Reset Email Sent</h4>} bsStyle="success">
                        <div>You will receive an email shortly from Gas Jot containing a link you can use to reset your password.</div>
                    </Panel>
                </Col>
                <GasJotFooter />
            </div>
        );
    }
}
