import React, { createClass } from "react"
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/gasjot-helmet.jsx";
import { Col, Panel, Label } from "react-bootstrap";
import { connect } from 'react-redux'
import GasJotNavbar from "../components/navbar.jsx"
import {toastr} from 'react-redux-toastr'
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
                <GasJotHelmet title="Log In" />
                <GasJotNavbar />
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={8} mdOffset={2}>
                            <h1 className="text-center" style={{marginBottom: 20}}>Reloading.  One moment please...</h1>
                        </Col>
                    </Panel>
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
