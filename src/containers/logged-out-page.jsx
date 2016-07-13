import React, { createClass } from "react"
import { Col, Panel } from "react-bootstrap"
import GasJotHelmet from "../components/gasjot-helmet.jsx"
import GasJotNavbar from "../components/navbar.jsx"
import * as gvs from "../grid-vals"

export default class LoggedOutPage extends React.Component {
     render() {
        return (
            <div>
                <GasJotHelmet title="Logged Out" />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Logged Out</h4>} bsStyle="success">
                        You have been logged out successfully.
                    </Panel>
                </Col>
            </div>
        );
    }
}
