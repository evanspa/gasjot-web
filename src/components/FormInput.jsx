import React, { createClass } from "react"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import { Link } from "react-router"
import { Button, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from "react-bootstrap";
import { DropdownList } from "react-widgets"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import * as utils from "../utils"

export class GasJotFormGroup extends React.Component {
    render() {
        momentLocalizer(moment)
        const { field, type } = this.props
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        const areErrors = !this.props.disabled && field != null && field.touched && (field.error != null) && (field.error.length > 0);
        if (areErrors) {
            formGroupOpts['validationState'] = "error"
        }
        const isDate = (type == "date")
        return (
            <div>
                <FormGroup {...formGroupOpts}>
                    <ControlLabel type={this.props.type}>{this.props.label}</ControlLabel>
                    {(() => {
                         if (isDate) {
                             return (<DateTimePicker
                                         time={false}
                                         editFormat={utils.DATE_EDIT_FORMAT}
                                         parse={str => moment(str, utils.DATE_EDIT_FORMAT).toDate()}
                                         format={utils.DATE_DISPLAY_FORMAT}
                                         value={moment(field.value, utils.DATE_DISPLAY_FORMAT).toDate()}
                                         onChange={(name, value) => field.onChange(value)}
                                         name={field.name}
                                         disabled={this.props.disabled}
                                         autoFocus={this.props.autoFocus} />)
                         } else {
                             return (<FormControl
                                         type={type}
                                         value={field.value}
                                         onChange={field.onChange}
                                         name={field.name}
                                         disabled={this.props.disabled}
                                         autoFocus={this.props.autoFocus} />)
                         }
                     })()
                    }
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

export class GasJotDateFormGroup extends React.Component {
    render() {
        return <GasJotFormGroup type="date" {...this.props} />
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
        const {
            field,
            disabled,
            data,
            valueField,
            textField,
            needToAddTextLinkObj
        } = this.props
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        const areErrors = !this.props.disabled && field != null && field.touched && (field.error != null) && (field.error.length > 0);
        if (areErrors) {
            formGroupOpts['validationState'] = "error"
        }
        return (
            <FormGroup {...formGroupOpts}>
                <ControlLabel type="text">{this.props.label}</ControlLabel>
                <DropdownList
                    onChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    valueField={valueField}
                    textField={textField}
                    data={data}
                    disabled={disabled} />
                {(() => {
                     if (needToAddTextLinkObj != null) {
                         let initFn = needToAddTextLinkObj.initFn
                         if (initFn == null) {
                             initFn = () => {}
                         }
                         return (<div style={{marginTop: 5}}>{needToAddTextLinkObj.question}  <Link onClick={initFn} to={needToAddTextLinkObj.url}>Click here</Link></div>)
                     } else {
                         return ""
                     }
                 }
                 )()
                }
                <HelpBlock>{areErrors ? field.error : ""}</HelpBlock>
            </FormGroup>
        )
    }
}
