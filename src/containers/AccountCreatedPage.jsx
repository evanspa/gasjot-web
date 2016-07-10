import React, { createClass } from "react"
import { Col, Panel, Button } from "react-bootstrap"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

class AccountCreatedPage extends React.Component {
    render() {
        const { handleAddVehicle } = this.props
        return (
            <div>
                <GasJotHelmet title="Account Created" />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Panel header={<h4>Account Created Successfully</h4>} bsStyle="success">
                        <div>Your account has been created successfully.</div>
                        <div style={{paddingTop: 15}}>Let's begin by adding your first vehicle.</div>
                        <p style={{marginTop: 15}}>
                            <Button bsStyle="primary" onClick={handleAddVehicle}>Add Vehicle</Button>
                        </p>
                    </Panel>
                </Col>
            </div>
        );
    }
}

AccountCreatedPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleAddVehicle: () => { dispatch(push(urls.ADD_VEHICLE_URI + "?nextPathname=" + urls.ROOT_URI)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreatedPage)
