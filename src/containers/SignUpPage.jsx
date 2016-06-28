import React, { createClass } from "react"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { attemptSignUp, clearErrors } from "../actions/actionCreators"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col, Panel, Button } from "react-bootstrap";
import SignUpForm from "../components/SignUpForm.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import _ from "lodash"
import * as urls from "../urls"

class SignUpPage extends React.Component {
    render() {
        const {
            handleSubmit,
            responseStatus,
            requestInProgress,
            clearErrors,
            fpErrorMask
        } = this.props
        var nextSuccessPathname = urls.ROOT_URI
        return (
            <div>
                <GasJotHelmet title="Sign Up" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={8} mdOffset={2}>
                            <h1 className="text-center" style={{marginBottom: 20}}>Sign up for a Gas Jot account.</h1>
                            <SignUpForm
                                onSubmit={() => handleSubmit()}
                                requestInProgress={requestInProgress}
                                clearErrors={clearErrors}
                                fpErrorMask={fpErrorMask} />
                            <hr />
                            <p>Already have an account?  <Link to={urls.LOGIN_URI}>Log in.</Link></p>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SignUpPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return state.api;
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: () => { dispatch(attemptSignUp()) },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
