import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import GasJotNavbar from "../components/navbar.jsx"
import UserAccountForm from "../components/user-account-form.jsx"
import { attemptSaveUserAccount,
         serverUserAccountNotFoundUserAcknowledged,
         clearErrors } from "../actions/action-creators"
import { toUserFormModel } from "../utils"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import * as urls from "../urls"
import { toastr } from 'react-redux-toastr'

class UserAccountEditPage extends React.Component {
    render() {
        const {
            userId,
            cancelUserAccountEdit,
            handleSubmit,
            api,
            clearErrors,
            userAcknowledgedNotFound,
            userIdNotFound,
            becameUnauthenticated,
            goBackFn
        } = this.props
        const { requestInProgress, fpErrorMask } = api
        let userPayload = {}
        userPayload["user/id"] = userId
        userPayload["user/name"] = this.props.userName
        userPayload["user/email"] = this.props.userEmail
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your user account info, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit()} />
        const entityForm = <UserAccountForm
                               cancelUserAccountEdit={cancelUserAccountEdit}
                               onSubmit={() => handleSubmit()}
                               requestInProgress={requestInProgress}
                               userAcknowledgedNotFound={userAcknowledgedNotFound}
                               userIdNotFound={userIdNotFound}
                               clearErrors={clearErrors}
                               userId={userId}
                               initialValues={toUserFormModel(userPayload)}
                               editMode={true}
                               fpErrorMask={fpErrorMask} />
        return (<EntityEditDetailPage
                    editMode={true}
                    goBackLinkText="&#8592; back"
                    goBackFn={goBackFn}
                    entityType="user account"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        userId: state.serverSnapshot["user/id"],
        userName: state.serverSnapshot["user/name"],
        userEmail: state.serverSnapshot["user/email"],
        becameUnauthenticated: state.becameUnauthenticated,
        userIdNotFound: state.api.userIdNotFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelUserAccountEdit: () => {
            toastr.clean()
            dispatch(push(urls.ACCOUNT_URI))
        },
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSaveUserAccount())
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (userId) => {
            dispatch(serverUserAccountNotFoundUserAcknowledged(userId))
            dispatch(push(urls.ACCOUNT_DELETED_URI))
        },
        goBackFn: () => dispatch(goBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountEditPage)
