import React, { createClass } from "react"
import { Link } from "react-router"
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Col, Panel, Label } from "react-bootstrap";
import ResetPasswordForm from "../components/reset-password-form.jsx";
import { connect } from 'react-redux'
import { attemptResetPassword, clearErrors } from "../actions/action-creators"
import GasJotNavbar from "../components/navbar.jsx"
import { makeLoginHandler } from "../utils"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

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
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel>
                        <h4 className="text-center">Password Reset</h4>
                        <ResetPasswordForm
                            onSubmit={() => handleSubmit(email, resetToken) }
                            requestInProgress={requestInProgress}
                            clearErrors={clearErrors}
                            fpErrorMask={fpErrorMask}
                            responseStatus={responseStatus} />
                        <hr />
                        <p>Not working? <Link to={urls.FORGOT_PASSWORD_URI}>Click here to get a new password-reset link.</Link></p>
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
