import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/gasjot-helmet.jsx"
import GasJotNavbar from "../components/navbar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default class ResetPasswordSuccessPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Password Reset Successful" />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Password Reset Successful</h4>} bsStyle="success">
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
