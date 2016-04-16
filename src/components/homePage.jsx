import React, { createClass } from "react"
import { Link } from "react-router"
import GasJotHelmet from "./common/gasjot-helmet.jsx";
import { Jumbotron, Col, Row } from "react-bootstrap";

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Home" />
                <Col md={6} mdOffset={3}>
                    <Jumbotron>
                        <h1>Welcome to Gas Jot</h1>
                        <p className="lead">A fun way to track your gas usage.</p>
                        <p><Link className="btn btn-lg btn-success" to="/signup" role="button">Sign up today</Link></p>
                    </Jumbotron>
                    <Row className="marketing">
                        <Col md={12}>
                            <h4>What is Gas Jot?</h4>
                            <p>Gas Jot is a fun way to track your gas usage.</p>
                        </Col>
                    </Row>
                </Col>
            </div>
        );
    }
}
