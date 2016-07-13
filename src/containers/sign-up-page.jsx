import React, { createClass } from "react"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { attemptSignUp, clearErrors } from "../actions/action-creators"
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Col, Panel, Button } from "react-bootstrap";
import SignUpForm from "../components/sign-up-form.jsx";
import GasJotNavbar from "../components/navbar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

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
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel>
                        <h4 className="text-center" style={{marginBottom: 20}}>Gas Jot Sign Up</h4>
                        <SignUpForm
                            onSubmit={() => handleSubmit()}
                            requestInProgress={requestInProgress}
                            clearErrors={clearErrors}
                            fpErrorMask={fpErrorMask} />
                        <hr />
                        <p>Already have an account?  <Link to={urls.LOGIN_URI}>Log in.</Link></p>
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
