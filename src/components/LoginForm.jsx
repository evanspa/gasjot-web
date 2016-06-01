import React, { createClass } from "react"
import { Button, Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form"
import { GasJotTextFormGroup, GasJotFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator } from "../utils"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "usernameOrEmail")
    cannotBeEmptyValidator(values, errors, "password")
    return errors
}

class LogInForm extends React.Component {
    render() {
        const { fields: {usernameOrEmail, password}, requestInProgress, handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Row><Col xs={12}><hr /></Col></Row>
                    <GasJotTextFormGroup
                        label="Username or E-mail"
                        field={usernameOrEmail}
                        autoFocus={true} />
                    <GasJotFormGroup
                        label="Password"
                        type="password"
                        field={password}
                        autoFocus={true} />
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
