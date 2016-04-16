import React, { createClass } from "react"
import { Router, Link } from "react-router"
import GasJotHelmet from "./common/gasjot-helmet.jsx";
import { Col, Panel } from "react-bootstrap";
import LoginForm from "./common/loginForm.jsx";

export default class LogInPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            usernameOrEmail: "",
            password: "",
            errors: {}
        };
        this.setUsernameOrEmail = this.setUsernameOrEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.login = this.login.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() {
        var isValid = true;
        const errors = {};
        if (this.state.usernameOrEmail.length == 0) {
            isValid = false;
            errors.usernameOrEmail = "Username or email cannot be empty.";
        }
        if (this.state.password.length == 0) {
            isValid = false;
            errors.password = "Password cannot be empty.";
        }
        this.setState({errors: errors});
        return isValid;
    }

    login(event) {
        if (!this.validateForm()) {
            return;
        }



        this.context.router.push('/signup');
    }

    setUsernameOrEmail(event) {
        this.setState({ usernameOrEmail: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <GasJotHelmet title="Log In" />
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={8} mdOffset={2}>
                            <h1 className="text-center" style={{marginBottom: 20}}>Log in to your Gas Jot account</h1>
                            <LoginForm
                                usernameOrEmailVal={this.state.usernameOrEmail}
                                passwordVal={this.state.password}
                                usernameOrEmailOnChange={this.setUsernameOrEmail}
                                passwordOnChange={this.setPassword}
                                onLogin={this.login}
                                errors={this.state.errors} />
                            <hr />
                            <p style={{paddingBottom: 10}}>Don't have an account?  <Link to="/signup">Sign up.</Link></p>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
LogInPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
