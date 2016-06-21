import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import UserAccountForm from "../components/UserAccountForm.jsx"
import { markUserForEdit } from "../actions/actionCreators"
import { toUserFormModel } from "../utils"
import * as urls from "../urls"

class UserAccountPage extends React.Component {
    render() {
        let userPayload = {}
        userPayload["user/name"] = this.props.userName
        userPayload["user/email"] = this.props.userEmail
        userPayload["user/verified-at"] = this.props.userVerifiedAt
        const { markUserForEdit } = this.props
        return (
            <div>
                <GasJotHelmet title="My User Account" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <h3 style={{paddingBottom: 5}}>My User Account</h3>
                    <UserAccountForm
                        markUserForEdit={markUserForEdit}
                        userVerifiedAt={userPayload['user/verified-at']}
                        initialValues={toUserFormModel(userPayload)}
                        editMode={false} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userName: state.serverSnapshot["user/name"],
        userEmail: state.serverSnapshot["user/email"],
        userVerifiedAt: state.serverSnapshot["user/verified-at"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markUserForEdit: () => {
            dispatch(markUserForEdit())
            dispatch(push(urls.EDIT_ACCOUNT_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage)
