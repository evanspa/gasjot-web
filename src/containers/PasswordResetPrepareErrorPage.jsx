import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"
import _ from "lodash"
import * as errFlags from "../errorFlags"
import ErrorMessages from "../components/ErrorMessages.jsx"
import * as urls from "../urls"
import * as utils from "../utils"

export default class PasswordResetPrepareErrorPage extends React.Component {
    render() {
        const { fpErrorMask } = this.props.params
        return (
            <div>
                <GasJotHelmet title="Password Reset Error" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel header={<h3>Password Reset Error</h3>} bsStyle="danger">
                        <div>There was a problem attempting to reset your password.</div>
                        {(() => {
                             if (fpErrorMask != null) {
                                 return (
                                     <div style={{marginTop: 15}}>
                                         <div style={{marginBottom: 5}}>Error message(s) from the server:</div>
                                         <ErrorMessages errorMask={fpErrorMask} errors={utils.PWD_RESET_ERRORS} />
                                     </div>
                                 )
                             }
                        })()
                        }
                        <div style={{marginTop: 15}}>
                            <Link to={urls.FORGOT_PASSWORD_URI}>Click here to get a new password reset link.</Link>
                        </div>
                    </Panel>
                </Col>
            </div>
        );
    }
}
