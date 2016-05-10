import React, { createClass } from "react"
import { Router, Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col, Panel } from "react-bootstrap";
import LoginForm from "../components/LoginForm.jsx";
import { connect } from 'react-redux'
import { attemptLogin } from "../actions/actionCreators"
import GasJotNavbar from "../components/NavBar.jsx"

class LogInPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            usernameOrEmail: "",
            password: "",
            errors: {}
        };
        this.setUsernameOrEmail = this.setUsernameOrEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.makeLoginClickHandler = this.makeLoginClickHandler.bind(this);
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

    makeLoginClickHandler(doLoginFn) {
        return (event) => {
            if (!this.validateForm()) {
                return;
            }
            doLoginFn(this.state.usernameOrEmail, this.state.password);
        }
    }

    setUsernameOrEmail(event) {
        this.setState({ usernameOrEmail: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        const { onLoginClick } = this.props
        return (
            <div>
                <GasJotHelmet title="Log In" />
                <div class="container"><GasJotNavbar /></div>
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={8} mdOffset={2}>
                            <h1 className="text-center" style={{marginBottom: 20}}>Log in to your Gas Jot account</h1>
                            <LoginForm
                                usernameOrEmailVal={this.state.usernameOrEmail}
                                passwordVal={this.state.password}
                                usernameOrEmailOnChange={this.setUsernameOrEmail}
                                passwordOnChange={this.setPassword}
                                onLoginClick={this.makeLoginClickHandler(onLoginClick)}
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

const mapStateToProps = (state) => {
    console.log("state from mapStateToProps: " + JSON.stringify(state))
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (usernameOrEmail, password) => {
            dispatch(attemptLogin(usernameOrEmail, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)