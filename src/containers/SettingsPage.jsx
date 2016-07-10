import React from "react"
import { Panel, Row, Col, Button, Well } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import { logout, attemptDownloadChangelog } from "../actions/actionCreators"
import * as urls from "../urls"
import { toastr } from 'react-redux-toastr'
import ReauthenticateModal from "./ReauthenticateModal.jsx"

class SettingsPage extends React.Component {
    render() {
        const {
            api,
            logout,
            logoutUri,
            becameUnauthenticated,
            downloadChangelog
        } = this.props
        const {
            authToken,
            requestInProgress,
            fpErrorMask
        } = api
        return (
            <div>
                <GasJotHelmet title="Settings" />
                <GasJotNavbar />
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="To download your edits, we need you to re-authenticate."
                    operationOnLightLoginSuccess={downloadChangelog} />
                <Col md={8} mdOffset={2} xs={12} xsOffset={0}>
                    <Panel>
                        <h4 style={{paddingBottom: 5}}>Gas Jot Settings</h4>
                        <form>
                            <Well>
                                <Button bsStyle="primary" onClick={downloadChangelog} disabled={requestInProgress}>Refresh All Records</Button>
                                <p style={{marginTop: 15}}>Reloads all of your data records from the server to ensure you have all edits (and deletions) made from your other devices.</p>
                            </Well>
                            <Well>
                                <Button bsStyle="danger" onClick={() => logout(logoutUri, authToken)} disabled={requestInProgress}>Logout</Button>
                                <p style={{marginTop: 15}}>If you're using a public computer, be sure to log out when you're done using Gas Jot.</p>
                            </Well>
                        </form>
                    </Panel>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const logoutLink = state.serverSnapshot._links.logout;
    var logoutUri = ""
    if (!_.isEmpty(logoutLink)) {
        logoutUri = logoutLink.href
    }
    return {
        api: state.api,
        logoutUri: logoutUri,
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (logoutUri, authToken) => {
            dispatch(logout(logoutUri, authToken))
        },
        downloadChangelog: () => {
            toastr.clean()
            dispatch(attemptDownloadChangelog(null, null))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
