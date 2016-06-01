import React, { createClass } from "react"
import { FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from "react-bootstrap";

export default class GasJotInput extends React.Component {
    render() {
        const areErrors = (this.props.error != null) && (this.props.error.length > 0);
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        if (areErrors) {
            formGroupOpts['validationState'] = "error"
        }
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

export class GasJotFormGroup extends React.Component {
    render() {
        const { field } = this.props
        const areErrors = (field.error != null) && (field.error.length > 0);
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        if (areErrors) {
            formGroupOpts['validationState'] = "error"
        }
        return (
            <div>
                <FormGroup {...formGroupOpts}>
                    <ControlLabel type={this.props.type}>{this.props.label}</ControlLabel>
                    <FormControl
                        type={this.props.type}
                        defaultValue={this.props.defaultValue}
                        onChange={field.onChange}
                        name={field.name}
                        disabled={this.props.disabled}
                        autoFocus={this.props.autoFocus} />
                    <HelpBlock>{field.error}</HelpBlock>
                </FormGroup>
            </div>
        )
    }
}

export class GasJotTextFormGroup extends React.Component {
    render() {
        return <GasJotFormGroup type="text" {...this.props} />
    }
}

export class GasJotCheckboxFormGroup extends React.Component {
    render() {
        const { field } = this.props
        return (
            <FormGroup>
                <Checkbox inline defaultChecked={this.props.defaultChecked} onChange={field.onChange} name={field.name} disabled={this.props.disabled}>
                    <ControlLabel type="text">{this.props.label}</ControlLabel>
                </Checkbox>
            </FormGroup>
        )
    }
}
