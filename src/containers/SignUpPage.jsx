import React, { createClass } from "react"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col, Input, Panel, Button } from "react-bootstrap";
import GasJotNavbar from "../components/NavBar.jsx"

export default class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Sign Up" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={8} mdOffset={2}>
                            <h1 className="text-center" style={{marginBottom: 20}}>Sign up for a Gas Jot account.</h1>
                            <form>
                                <Input label="Your name" type="text" placeholder="e.g., Bruce Jones" />
                                <Input label="Email address" type="email" placeholder="e.g., bruce@gmail.com" />
                                <Input label="Password" type="password" placeholder="e.g., &#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;" />
                                <Button bsStyle="primary" bsSize="large" block>Sign up</Button>
                            </form>
                            <hr />
                            <p>Already have an account?  <Link to="/login">Log in.</Link></p>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );
    }
}
