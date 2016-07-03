import React, { createClass } from "react"
import { Label, Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import { GasJotTextFormGroup, GasJotFormGroup } from "./FormInput.jsx"
import ErrorMessages from "./ErrorMessages.jsx"
import { toastr } from 'react-redux-toastr'
import * as utils from "../utils"

const validate = values => {
    const errors = {}
    utils.cannotBeEmptyValidator(values, errors, "password")
    utils.cannotBeEmptyValidator(values, errors, "confirmPassword")

    // only check they match if there are no other errors associated
    // with either of them
    if (_.isEmpty(errors.password) && _.isEmpty(errors.confirmPassword)) {
        if (values.password != values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match."
        }
    }
    return errors
}

class ResetPasswordForm extends React.Component {

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            fields: {
                password,
                confirmPassword
            },
            location,
            fpErrorMask,
            responseStatus,
            requestInProgress,
            handleSubmit
        } = this.props
        return (
            <div>
                <div style={{marginTop: 20}}>
                    <ErrorMessages errorMask={fpErrorMask} errors={utils.PWD_RESET_ERRORS} />
                </div>
                <form onSubmit={handleSubmit}>
                    <Row><Col xs={12}><hr style={{ marginTop: 10, marginBottom: 10}}/></Col></Row>
                    <GasJotTextFormGroup
                        label="New password"
                        type="password"
                        field={password}
                        autoFocus={true} />
                    <GasJotFormGroup
                        label="Confirm password"
                        type="password"
                        field={confirmPassword} />
                    <Button type="submit" bsStyle="primary" bsSize="large" disabled={requestInProgress} block>Submit</Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "resetpassword",
    fields: ["password", "confirmPassword"],
    validate
})(ResetPasswordForm)
