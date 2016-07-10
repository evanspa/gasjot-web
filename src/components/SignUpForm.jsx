import React, { createClass } from "react"
import { Button, Row, Col, Label } from "react-bootstrap";
import { reduxForm } from "redux-form"
import { GasJotTextFormGroup, GasJotFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, mustBeEmailValidator } from "../utils"
import * as errFlags from "../errorFlags"
import { toastr } from 'react-redux-toastr'

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "name")
    cannotBeEmptyValidator(values, errors, "email")
    mustBeEmailValidator(values, errors, "email")
    cannotBeEmptyValidator(values, errors, "password")
    return errors
}

class SignUpForm extends React.Component {

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const { fields: {name, email, password},
                requestInProgress,
                fpErrorMask,
                handleSubmit } = this.props
        return (
            <div>
                { (() => {
                      if (fpErrorMask != null) {
                          if (fpErrorMask & errFlags.SAVE_USER_EMAIL_AlREADY_REGISTERED) {
                              return (
                                  <h4 style={{marginTop: 20}}><Label bsStyle="danger">Account ({email.value}) already exists.</Label></h4>
                              )
                          }
                      }
                      return ""

                  })()
                }
                <form onSubmit={handleSubmit}>
                    <Row><Col xs={12}><hr style={{ marginTop: 10, marginBottom: 10}}/></Col></Row>
                    <GasJotTextFormGroup
                        label="Name"
                        field={name}
                        autoFocus={true} />
                    <GasJotTextFormGroup
                        label="E-mail"
                        field={email} />
                    <GasJotFormGroup
                        label="Password"
                        type="password"
                        field={password} />
                    <Button type="submit" bsStyle="primary" disabled={requestInProgress}>Sign up</Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "signup",
    fields: ["name", "email", "password"],
    validate
})(SignUpForm)
