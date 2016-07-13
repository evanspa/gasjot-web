import React from "react"
import { Button, Row, Col, Panel, Well } from "react-bootstrap";
import { reduxForm } from "redux-form"
import SmallModal from "./small-modal.jsx"
import { GasJotTextFormGroup, GasJotCheckboxFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator, mustBeNumberValidator } from "../utils"
import _ from "lodash"
import * as errFlags from "../error-flags"
import ActionsArray from "./actions-array.jsx"
import ErrorMessages from "./error-messages.jsx"

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

    constructor(props, context) {
        super(props, context);
        this.state = {
            showSmallModal: false,
            smallModalTitle: null,
            smallModalContent: null,
            showEntityGoneModal: false,
            entityGoneModalTitle: "Account deactivated on other device",
            entityGoneModalContent: "It appears your Gas Jot account has been deactivated."
        };
    }

    componentWillReceiveProps(nextProps) {
        const { userId } = this.props
        const { userIdNotFound } = nextProps
        if (userIdNotFound != null && userId == userIdNotFound) {
            this.setState({showEntityGoneModal: true})
        }
    }

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        // https://github.com/erikras/redux-form/issues/190
        const {
            fields: {
                name,
                email,
                password,
                confirmPassword
            },
            userId,
            userVerifiedAt,
            markUserAccountForEdit,
            cancelUserAccountEdit,
            userAcknowledgedNotFound,
            downloadUserAccount,
            resendVerificationEmail,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            fpErrorMask
        } = this.props
        let smallModalClose = () => this.setState({ showSmallModal: false })
        const actionArray = <ActionsArray
                                editMode={editMode}
                                entityId={userId}
                                cancelEntityEdit={cancelUserAccountEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markUserAccountForEdit}
                                downloadEntity={downloadUserAccount} />
        const errors = [
            { flag: errFlags.SAVE_USER_EMAIL_AlREADY_REGISTERED,
              message: "This email is already in use by another account."}
        ]
        return (
        <div>
            <SmallModal
                show={this.state.showSmallModal}
                buttonTitle="Close"
                onHide={smallModalClose}
                title={this.state.smallModalTitle}
                content={this.state.smallModalContent} />
            <SmallModal
                show={this.state.showEntityGoneModal}
                buttonTitle="Okay"
                onHide={() => {
                        this.setState({ showEntityGoneModal: false })
                        userAcknowledgedNotFound(userId)
                    }}
                title={this.state.entityGoneModalTitle}
                content={this.state.entityGoneModalContent} />
            <ErrorMessages errorMask={fpErrorMask} errors={errors} />
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
                                     <span style={{marginRight: 10}}>Your account is not verified.</span><Button style={{marginTop: 5, marginBottom: 5}} onClick={resendVerificationEmail} bsSize="small">re-send verification email</Button>
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
