import React from "react"
import { Button, Row, Col, Panel, Well } from "react-bootstrap";
import momentLocalizer from "react-widgets/lib/localizers/moment"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import moment from "moment"
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import SmallModal from "./SmallModal.jsx"
import { GasJotTextFormGroup, GasJotCheckboxFormGroup } from "./FormInput.jsx"
import { cannotBeEmptyValidator, mustBeNumberValidator } from "../utils"
import _ from "lodash"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "name")
    cannotBeEmptyValidator(values, errors, "email")
    const password = values.password
    const confirmPassword = values.confirmPassword

    if (password != null && !_.isEmpty(_.trim(password))) {
        if (confirmPassword != null && !_.isEmpty(_.trim(confirmPassword))) {
            if (!_.isEqual(password, confirmPassword)) {
                errors.confirmPassword = "Passwords do not match."
            }
        } else {
            errors.confirmPassword = "Cannot be empty."
        }
    } else if (confirmPassword != null && !_.isEmpty(_.trim(confirmPassword))) {
        errors.password = "Cannot be empty."
    }
    return errors
}

class UserAccountForm extends React.Component {

    render() {
        // https://github.com/erikras/redux-form/issues/190
        const { fields: {name,
                         email,
                         password,
                         confirmPassword},
                userVerifiedAt,
                markUserForEdit,
                cancelUserEdit,
                handleSubmit,
                requestInProgress,
                editMode } = this.props
        let cancelButton = null
        let saveButton = null
        let editButton = null
        let actionArray;
        if (editMode) {
            cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={() => cancelUserEdit()} disabled={requestInProgress}>Cancel</Button>
            saveButton = <Button type="submit" style={{marginBottom: 0}} bsStyle="success" disabled={requestInProgress}>Save</Button>
            actionArray = <div>{cancelButton}{saveButton}</div>
        } else {
            editButton = <Button bsStyle="primary" onClick={() => markUserForEdit()}>Edit</Button>
            actionArray = editButton
        }
        return (
        <div>
            <form onSubmit={handleSubmit}>
                { actionArray }
                <Row><Col xs={12}><hr /></Col></Row>
                <GasJotTextFormGroup
                    label="Name"
                    field={name}
                    disabled={!editMode}
                    autoFocus={true} />
                <GasJotTextFormGroup
                    label="E-mail"
                    field={email}
                    disabled={!editMode} />
                {(() => {
                     if (editMode) {
                         return (
                             <div>
                                 <GasJotTextFormGroup
                                     label="Password"
                                     type="password"
                                     field={password} />
                                 <GasJotTextFormGroup
                                     label="Confirm password"
                                     type="password"
                                     field={confirmPassword} />
                                 <Panel header={(<em>Protip</em>)} bsStyle="info">
                                     If you don't want to change your password, leave the password field blank.
                                 </Panel>
                             </div>
                         )
                     } else {
                         const isAccountVerified = (userVerifiedAt != null)
                         let accountVerifiedPanel;
                         if (isAccountVerified) {
                             accountVerifiedPanel = (
                                 <Panel header="Verified" bsStyle="success">
                                     Your account is verified.  Thank you.
                                 </Panel>
                             )
                         } else {
                             accountVerifiedPanel = (
                                 <Panel header="Not Verified" bsStyle="warning">
                                     Your account is not verified.
                                 </Panel>
                             )
                         }
                         return (
                             <div>
                                 <GasJotTextFormGroup
                                     label="Password"
                                     defaultValue="**********************"
                                     field={password}
                                     disabled={true} />
                                 <div style={{ marginTop: 30 }}>
                                     <label type="text" className="control-label">Account Status</label>
                                     {accountVerifiedPanel}
                                 </div>
                             </div>
                         )
                     }
                 })()
                }
                <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                { actionArray }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: "userAccountEdit",
    fields: ["name", "email", "password", "confirmPassword"],
    validate
})(UserAccountForm)
