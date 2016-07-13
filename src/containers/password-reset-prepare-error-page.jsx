import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import GasJotHelmet from "../components/gasjot-helmet.jsx"
import GasJotNavbar from "../components/navbar.jsx"
import _ from "lodash"
import * as errFlags from "../error-flags"
import ErrorMessages from "../components/error-messages.jsx"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"

export default class PasswordResetPrepareErrorPage extends React.Component {
    render() {
        const { fpErrorMask } = this.props.params
        return (
            <div>
                <GasJotHelmet title="Password Reset Error" />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Password Reset Error</h4>} bsStyle="danger">
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
