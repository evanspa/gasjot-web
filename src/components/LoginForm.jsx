import React, { createClass } from "react"
import { Button } from "react-bootstrap";
import GasJotInput from "./FormInput.jsx";

export default class LogInForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onLoginClick}>
                <GasJotInput
                    label="Username or Email address"
                    type="text"
                    error={this.props.errors.usernameOrEmail}
                    value={this.props.usernameOrEmailVal}
                    onChange={this.props.usernameOrEmailOnChange}
                    autoFocus={true} />
                <GasJotInput
                    label="Password"
                    type="password"
                    error={this.props.errors.password}
                    value={this.props.passwordVal}
                    onChange={this.props.passwordOnChange} />
                <Button type="submit" bsStyle="primary" bsSize="large" disabled={this.props.requestInProgress} block>Log in submit</Button>
            </form>
        );
    }
}
