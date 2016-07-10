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
import * as gvs from "../grid-vals"

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
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel>
                        <h4 className="text-center">Gas Jot Login</h4>
                        <LoginForm
                            onSubmit={ makeLoginHandler(location, handleSubmit) }
                            requestInProgress={requestInProgress}
                            clearErrors={clearErrors}
                            responseStatus={responseStatus} />
                        <hr />
                        <p style={{paddingBottom: 10}}>Don't have an account?  <Link to={urls.SIGNUP_URI}>Sign up.</Link></p>
                        <Link to={urls.FORGOT_PASSWORD_URI}>Forgot Password?</Link>
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
