import React, { createClass } from "react"
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Col, Panel, Label, Image } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotNavbar from "../components/navbar.jsx"
import {toastr} from 'react-redux-toastr'
import * as gvs from "../grid-vals"
import _ from "lodash"

class RedirectPage extends React.Component {

    componentDidMount() {
        const { query } = this.props.location
        if (!_.isEmpty(query.nextPathname)) {
            const { redirectToPath } = this.props
            redirectToPath(query.nextPathname)
        }
    }

    render() {
        return (
            <div>
                <GasJotHelmet title="Loading" />
                <GasJotNavbar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <img className="center-block" src="/images/loading.gif" />
                </Col>
            </div>
        );
    }
}

RedirectPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        redirectToPath: (pathname) => {
            dispatch(push(pathname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectPage)
