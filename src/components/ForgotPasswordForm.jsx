import React, { createClass } from "react"
import { Label, Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import { GasJotTextFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, mustBeEmailValidator } from "../utils"
import ErrorMessages from "./ErrorMessages.jsx"
import * as errFlags from "../errorFlags"
import { toastr } from 'react-redux-toastr'

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "email")
    mustBeEmailValidator(values, errors, "email")
    return errors
}

class ForgotPasswordForm extends React.Component {

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            fields: {email},
            responseStatus,
            requestInProgress,
            handleSubmit,
            fpErrorMask,
        } = this.props
        const errors = [
            { flag: errFlags.PWD_RESET_UNKNOWN_EMAIL,
              message: "Unknown email address." }
        ]
        return (
            <div>
                <ErrorMessages
                    errorMask={fpErrorMask}
                    errors={errors}
                    marginTop={20}/>
                <form onSubmit={handleSubmit}>
                    <Row><Col xs={12}><hr style={{ marginTop: 10, marginBottom: 10}}/></Col></Row>
                    <GasJotTextFormGroup
                        label="E-mail"
                        field={email}
                        autoFocus={true} />
                    <Button type="submit" bsStyle="primary" disabled={requestInProgress} block>Submit</Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "forgotpassword",
    fields: ["email"],
    validate
})(ForgotPasswordForm)
