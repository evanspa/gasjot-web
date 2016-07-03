import React, { createClass } from "react"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col, Panel, Label } from "react-bootstrap";
import ResetPasswordForm from "../components/ResetPasswordForm.jsx";
import { connect } from 'react-redux'
import { attemptResetPassword, clearErrors } from "../actions/actionCreators"
import GasJotNavbar from "../components/NavBar.jsx"
import { makeLoginHandler } from "../utils"
import _ from "lodash"
import * as urls from "../urls"

class ResetPasswordPage extends React.Component {
    render() {
        const {
            location,
            handleSubmit,
            api,
            clearErrors
        } = this.props
        const { responseStatus, requestInProgress, fpErrorMask } = api
        const { email, resetToken } = this.props.params
        return (
            <div>
                <GasJotHelmet title="Password Reset" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col xs={8} xsOffset={2}>
                            <h2 className="text-center">Password Reset</h2>
                            <ResetPasswordForm
                                onSubmit={() => handleSubmit(email, resetToken) }
                                requestInProgress={requestInProgress}
                                clearErrors={clearErrors}
                                fpErrorMask={fpErrorMask}
                                responseStatus={responseStatus} />
                            <hr />
                            <p>Not working? <Link to={urls.FORGOT_PASSWORD_URI}>Click here to get a new password-reset link.</Link></p>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
ResetPasswordPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (email, resetToken) => {
            dispatch(attemptResetPassword(email, resetToken))
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
