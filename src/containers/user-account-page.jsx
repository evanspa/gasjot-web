import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import GasJotNavbar from "../components/navbar.jsx"
import UserAccountForm from "../components/user-account-form.jsx"
import { markUserForEdit,
         attemptDownloadUserAccount,
         clearErrors,
         serverUserAccountNotFoundUserAcknowledged,
         attemptResendVerificationEmail } from "../actions/action-creators"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "../containers/reauthenticate-modal.jsx"
import { toastr } from 'react-redux-toastr'
import { toUserFormModel } from "../utils"
import * as urls from "../urls"

class UserAccountPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.userId != null;
    }


    render() {
        const {
            userId,
            markUserAccountForEdit,
            downloadUserAccount,
            resendVerificationEmail,
            clearErrors,
            userAcknowledgedNotFound,
            userIdNotFound,
            becameUnauthenticated,
            goBackFn
        } = this.props
        let userPayload = {}
        userPayload["user/id"] = userId
        userPayload["user/name"] = this.props.userName
        userPayload["user/email"] = this.props.userEmail
        userPayload["user/verified-at"] = this.props.userVerifiedAt
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To download your user account info, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => downloadUserAccount(userId)} />
        const entityForm = <UserAccountForm
                               userVerifiedAt={userPayload['user/verified-at']}
                               markUserAccountForEdit={markUserAccountForEdit}
                               downloadUserAccount={downloadUserAccount}
                               resendVerificationEmail={resendVerificationEmail}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               userIdNotFound={userIdNotFound}
                               clearErrors={clearErrors}
                               userId={userId}
                               initialValues={toUserFormModel(userPayload)}
                               editMode={false} />
        return (<EntityEditDetailPage
                    editMode={false}
                    goBackLinkText="&#8592; back"
                    goBackFn={goBackFn}
                    entityType="user account"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.serverSnapshot["user/id"],
        userName: state.serverSnapshot["user/name"],
        userEmail: state.serverSnapshot["user/email"],
        userVerifiedAt: state.serverSnapshot["user/verified-at"],
        becameUnauthenticated: state.becameUnauthenticated,
        userIdNotFound: state.api.userIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markUserAccountForEdit: () => {
            toastr.clean()
            dispatch(markUserForEdit())
            dispatch(push(urls.EDIT_ACCOUNT_URI))
        },
        downloadUserAccount: (userId) => {
            toastr.clean()
            dispatch(attemptDownloadUserAccount(userId, urls.ACCOUNT_URI))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (userId) => {
            dispatch(serverUserAccountNotFoundUserAcknowledged(userId))
            dispatch(push(urls.ACCOUNT_DELETED_URI))
        },
        resendVerificationEmail: () => dispatch(attemptResendVerificationEmail()),
        goBackFn: () => dispatch(goBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage)
