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
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col xs={8} xsOffset={2}>
                            <span>Enter your email address below, and we'll send you a link to use to reset your password.</span>
                            <ForgotPasswordForm
                                onSubmit={handleSubmit}
                                requestInProgress={requestInProgress}
                                clearErrors={clearErrors}
                                fpErrorMask={fpErrorMask} />
                        </Col>
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
