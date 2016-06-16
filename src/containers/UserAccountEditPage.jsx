import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import UserAccountForm from "../components/UserAccountForm.jsx"
import { attemptSaveUser } from "../actions/actionCreators"
import { toUserFormModel } from "../utils"
import ReauthenticateModal from "./ReauthenticateModal.jsx"

class UserAccountEditPage extends React.Component {
    render() {
        let userPayload = {}
        userPayload["user/name"] = this.props.userName;
        userPayload["user/email"] = this.props.userEmail;
        const { cancelUserEdit, handleSubmit, requestInProgress } = this.props
        const { becameUnauthenticated } = this.props
        return (
            <div>
                <GasJotHelmet title="Edit User Account" />
                <GasJotNavbar />
                <ReauthenticateModal showModal={becameUnauthenticated} />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <h3 style={{paddingBottom: 5}}>Edit User Account</h3>
                    <UserAccountForm
                        cancelUserEdit={cancelUserEdit}
                        onSubmit={handleSubmit}
                        requestInProgress={requestInProgress}
                        userVerifiedAt={userPayload['user/verified-at']}
                        initialValues={toUserFormModel(userPayload)}
                        editMode={true} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requestInProgress: state.api.requestInProgress,
        userName: state.serverSnapshot["user/name"],
        userEmail: state.serverSnapshot["user/email"],
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelUserEdit: () => { dispatch(push("/account")) },
        handleSubmit: () => {
            dispatch(attemptSaveUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountEditPage)
