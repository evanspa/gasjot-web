import React from "react"
import { Link } from "react-router"
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Jumbotron, Col, Row } from "react-bootstrap";
import GasJotNavbar from "../components/navbar.jsx"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default (props) =>
    <div>
        <GasJotHelmet title="Home" />
        <GasJotNavbar />
        <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
             md={gvs.MD} mdOffset={gvs.MD_OFFSET}
             sm={gvs.SM} smOffset={gvs.SM_OFFSET}
             xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
            <Jumbotron>
                <h3>Welcome to Gas Jot</h3>
                <p className="lead">A fun way to track your gas usage.</p>
                <p style={{marginTop: 20}}><Link className="btn btn-lg btn-success" to={urls.SIGNUP_URI} role="button">Sign up today</Link></p>
            </Jumbotron>
            <Row className="marketing">
                <Col md={12}>
                    <h4>What is Gas Jot?</h4>
                    <p>Gas Jot is a fun way to track your gas usage.</p>
                </Col>
            </Row>
        </Col>
    </div>
;
