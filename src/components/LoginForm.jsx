import React, { createClass } from "react"
import { Input, Button } from "react-bootstrap";
import GasJotInput from "./formInput.jsx";

export default class LogInForm extends React.Component {
    render() {
        return (
            <form>
                <GasJotInput
                    label="Username or Email address"
                    type="text"
                    error={this.props.errors.usernameOrEmail}
                    value={this.props.usernameOrEmailVal}
                    onChange={this.props.usernameOrEmailOnChange}
                    autoFocus />
                <GasJotInput
                    label="Password"
                    type="password"
                    error={this.props.errors.password}
                    value={this.props.passwordVal}
                    onChange={this.props.passwordOnChange} />
                <Button bsStyle="primary" bsSize="large" block onClick={this.props.onLoginClick}>Log in</Button>
            </form>
        );
    }
}
