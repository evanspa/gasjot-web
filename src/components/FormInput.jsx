import React, { createClass } from "react"
import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";

export default class GasJotInput extends React.Component {
    render() {
        const areErrors = (this.props.error != null) && (this.props.error.length > 0);
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        if (areErrors) {
            formGroupOpts['validationState'] = "error"
        }
        //const formControlOpts = {}
        //if (this.props.autoFocus
        return (
            <div>
                <FormGroup {...formGroupOpts}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <FormControl
                        type={this.props.type}
                        onChange={this.props.onChange}
                        value={this.props.value}
                        autoFocus={this.props.autoFocus} />
                    <HelpBlock>{this.props.error}</HelpBlock>
                </FormGroup>
            </div>
        )
    }
}
