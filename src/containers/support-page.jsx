import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx"
import GasJotNavbar from "../components/navbar.jsx"
import GasJotFooter from "../components/gasjot-footer.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

class SupportPage extends React.Component {
    render() {
        return (
            <div>
                <GasJotHelmet title="Support" />
                <GasJotNavbar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Support</h4>} bsStyle="success">
                        <div>Have a question or need some help?  Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a></div>
                    </Panel>
                </Col>
                <GasJotFooter />
            </div>
        );
    }
}

SupportPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage)
