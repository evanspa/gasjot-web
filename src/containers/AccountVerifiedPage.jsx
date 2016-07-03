import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"
import { attemptDownloadUserAccount } from "../actions/actionCreators"
import _ from "lodash"
import * as urls from "../urls"

class AccountVerifiedPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { componentDidMount: false }
    }

    componentDidMount() {
        this.setState = { componentDidMount: true }
        const { authToken, downloadUser } = this.props
        if (!_.isEmpty(authToken)) {
            downloadUser()
        }
    }

    render() {
        const { authToken } = this.props
        return (
            <div>
                <GasJotHelmet title="Account Verified" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel header={<h3>Account Verified Successfully</h3>} bsStyle="success">
                        <div>Your account has been verified.</div>
                        <div style={{paddingTop: 15}}>
                        {
                            (() => {
                                if (!_.isEmpty(authToken)) {
                                    return (<Link to={urls.ROOT_URI}>Your Gas Jot Home.</Link>)
                                } else {
                                    if (this.state.componentDidMount) {
                                        return (<Link to={urls.LOGIN_URI}>Log in to your Gas Jot account.</Link>)
                                    } else {
                                        return (<span>One moment...</span>) // initial render on server
                                    }
                                }
                            })()
                        }
                        </div>
                    </Panel>
                </Col>
            </div>
        );
    }
}

AccountVerifiedPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return { authToken: state.authToken }
}

const mapDispatchToProps = (dispatch) => {
    return { downloadUser: () => dispatch(attemptDownloadUserAccount(null, urls.ACCOUNT_VERIFICATION_SUCCESS_URI, true)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerifiedPage)
