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
                    onChange={this.props.usernameOrEmailOnChange} />
                <GasJotInput
                    label="Password"
                    type="password"
                    error={this.props.errors.password}
                    value={this.props.passwordVal}
                    onChange={this.props.passwordOnChange} />
                <Input ref="rememberMe" type="checkbox" label="Remember me" />
                <Button bsStyle="primary" bsSize="large" block onClick={this.props.onLogin}>Log in</Button>
            </form>
        );
    }
}
