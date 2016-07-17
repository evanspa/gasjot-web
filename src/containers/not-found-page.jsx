import React, { createClass } from "react"
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Col } from "react-bootstrap";
import GasJotNavbar from "../components/navbar.jsx"
import GasJotFooter from "../components/gasjot-footer.jsx"
import * as gvs from "../grid-vals"

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Not Found" />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h4>Page not found.</h4>
                </Col>
                <GasJotFooter />
            </div>
        );
    }
}
