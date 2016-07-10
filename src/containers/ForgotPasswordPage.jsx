import React, { createClass } from "react"
import { connect } from 'react-redux'
import { Row, Col, Panel } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"
import ForgotPasswordForm from "../components/ForgotPasswordForm.jsx"
import { attemptSendPasswordResetEmail,
         clearErrors } from "../actions/actionCreators"
import { toastr } from 'react-redux-toastr'
import * as gvs from "../grid-vals"

class ForgotPasswordPage extends React.Component {

    render() {
        const {
            handleSubmit,
            api,
            clearErrors
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        return (
            <div>
                <GasJotHelmet title="Password Reset" />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel>
                        <span>Enter your email address below, and we'll send you a link to use to reset your password.</span>
                        <ForgotPasswordForm
                            onSubmit={handleSubmit}
                            requestInProgress={requestInProgress}
                            clearErrors={clearErrors}
                            fpErrorMask={fpErrorMask} />
                    </Panel>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSendPasswordResetEmail())
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
