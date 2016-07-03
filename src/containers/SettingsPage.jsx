import React from "react"
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import { logout } from "../actions/actionCreators"
import * as urls from "../urls"

class SettingsPage extends React.Component {
    render() {
        const {
            api,
            logout,
            logoutUri
        } = this.props
        const { authToken,
                requestInProgress,
                fpErrorMask
        } = api
        return (
            <div>
                <GasJotHelmet title="Settings" />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <h3 style={{paddingBottom: 5}}>Settings</h3>
                    <form>
                        <Button onClick={() => logout(logoutUri, authToken)} disabled={requestInProgress}>Logout</Button>
                    </form>
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
        logoutUri: logoutUri
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (logoutUri, authToken) => {
            dispatch(logout(logoutUri, authToken))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
