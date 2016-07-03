import React, { createClass } from "react"
import { Label, Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import { GasJotTextFormGroup, GasJotFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator } from "../utils"
import { toastr } from 'react-redux-toastr'
import _ from "lodash"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "usernameOrEmail")
    cannotBeEmptyValidator(values, errors, "password")
    return errors
}

class LogInForm extends React.Component {

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const { fields: {usernameOrEmail, password}, location, responseStatus, requestInProgress, handleSubmit } = this.props
        var serverErrorMessage = null
        if (!_.isNull(responseStatus) && responseStatus === 401) {
            serverErrorMessage = <h4 style={{marginTop: 20}}><Label bsStyle="danger">Login failed.  Try again.</Label></h4>
        }
        return (
            <div>
                { (!_.isNull(serverErrorMessage)) ? serverErrorMessage : "" }
                <form onSubmit={handleSubmit}>
                    <Row><Col xs={12}><hr style={{ marginTop: 10, marginBottom: 10}}/></Col></Row>
                    <GasJotTextFormGroup
                        label="Username or E-mail"
                        field={usernameOrEmail}
                        autoFocus={true} />
                    <GasJotFormGroup
                        label="Password"
                        type="password"
                        field={password} />
                    <Button type="submit" bsStyle="primary" bsSize="large" disabled={requestInProgress} block>Log in</Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "login",
    fields: ["usernameOrEmail", "password"],
    validate
})(LogInForm)
