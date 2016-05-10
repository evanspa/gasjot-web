import React from "react"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Jumbotron, Col, Row } from "react-bootstrap";
import GasJotNavbar from "../components/NavBar.jsx"

export default (props) =>
    <div>
        <GasJotHelmet title="Home" />
        <div class="container"><GasJotNavbar /></div>
        <Col md={6} mdOffset={3}>
            <h1>Welcome Back to Gas Jot</h1>
        </Col>
    </div>
;
