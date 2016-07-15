import React, { createClass } from "react"
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Col, Panel, Label, Image } from "react-bootstrap";
import GasJotNavbar from "../components/navbar.jsx"
import * as gvs from "../grid-vals"

export default class LoadingPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Loading" />
                <GasJotNavbar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <img className="center-block" src="/images/loading.gif" />
                </Col>
            </div>
        );
    }
}
