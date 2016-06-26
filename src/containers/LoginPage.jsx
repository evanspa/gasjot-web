import React, { createClass } from "react"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col, Panel, Label } from "react-bootstrap";
import LoginForm from "../components/LoginForm.jsx";
import { connect } from 'react-redux'
import { attemptLogin, clearErrors } from "../actions/actionCreators"
import GasJotNavbar from "../components/NavBar.jsx"
import { makeLoginHandler } from "../utils"
import _ from "lodash"
import * as urls from "../urls"

class LogInPage extends React.Component {

    /* componentWillReceiveProps(nextProps) {
     *     const { responseStatus } = nextProps
     *     if (!_.isNull(responseStatus) && responseStatus === 401) {
     *         //this.setState({ password: "" })
     *         //console.log("401 received")
     *     }
     * }*/

    render() {
        const {
            location,
            handleSubmit,
            responseStatus,
            requestInProgress,
            clearErrors
        } = this.props
        return (
            <div>
                <GasJotHelmet title="Log In" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col xs={8} xsOffset={2}>
                            <h1 className="text-center">Log in to your Gas Jot account</h1>
                            <LoginForm
                                onSubmit={ makeLoginHandler(location, handleSubmit) }
                                requestInProgress={requestInProgress}
                                clearErrors={clearErrors}
                                responseStatus={responseStatus} />
                            <hr />
                            <p style={{paddingBottom: 10}}>Don't have an account?  <Link to={urls.SIGNUP_URI}>Sign up.</Link></p>
                            <Link to={urls.FORGOT_PASSWORD_URI}>Forgot Password?</Link>
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
    return state.api;
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (nextSuccessPathname) => { dispatch(attemptLogin(nextSuccessPathname)) },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)
