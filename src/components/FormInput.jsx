import React, { createClass } from "react"
import { FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from "react-bootstrap";
import { DropdownList } from "react-widgets"

export class GasJotFormGroup extends React.Component {
    render() {
        const { field } = this.props
        const areErrors = !this.props.disabled && field.touched && (field.error != null) && (field.error.length > 0);
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
                        value={field.value}
                        onChange={field.onChange}
                        name={field.name}
                        disabled={this.props.disabled}
                        autoFocus={this.props.autoFocus} />
                    <HelpBlock>{areErrors ? field.error : ""}</HelpBlock>
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
                <Checkbox
                    inline={true}
                    checked={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    disabled={this.props.disabled}>
                    <ControlLabel type="text">{this.props.label}</ControlLabel>
                </Checkbox>
            </FormGroup>
        )
    }
}

export class GasJotDropdownFormGroup extends React.Component {
    render() {
        const { field, defaultValue, disabled, data, valueField, textField } = this.props
        return (
            <FormGroup>
                <ControlLabel type="text">{this.props.label}</ControlLabel>
                <DropdownList
                    onChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    valueField={valueField}
                    textField={textField}
                    data={data}
                    disabled={disabled} />
            </FormGroup>
        )
    }
}
