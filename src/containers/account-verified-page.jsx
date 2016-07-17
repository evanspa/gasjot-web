import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx"
import GasJotNavbar from "../components/navbar.jsx"
import GasJotFooter from "../components/gasjot-footer.jsx"
import { attemptDownloadUserAccount } from "../actions/action-creators"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

class AccountVerifiedPage extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
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
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Account Verified Successfully</h4>} bsStyle="success">
                        <div>Your account has been verified.</div>
                        <div style={{paddingTop: 15}}>
                        {
                            (() => {
                                if (!_.isEmpty(authToken)) {
                                    return (<Link to={urls.ROOT_URI}>Your Gas Jot Home.</Link>)
                                } else {
                                    return (<Link to={urls.LOGIN_URI}>Log in to your Gas Jot account.</Link>)
                                }
                            })()
                        }
                        </div>
                    </Panel>
                </Col>
                <GasJotFooter />
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
