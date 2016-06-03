import React, { createClass } from "react"
import { Router, Link } from "react-router"
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import { Col, Panel, Label } from "react-bootstrap";
import LoginForm from "../components/LoginForm.jsx";
import { connect } from 'react-redux'
import { attemptLogin } from "../actions/actionCreators"
import GasJotNavbar from "../components/NavBar.jsx"
import { reduxForm } from "redux-form"
import _ from "lodash"

class LogInPage extends React.Component {

    /* componentWillReceiveProps(nextProps) {
     *     const { responseStatus } = nextProps
     *     if (!_.isNull(responseStatus) && responseStatus === 401) {
     *         //this.setState({ password: "" })
     *         //console.log("401 received")
     *     }
     * }*/

    render() {
        const { handleSubmit, responseStatus, requestInProgress } = this.props
        var nextSuccessPathname = "/";
        const { location } = this.props
        if (location.state && location.state.nextPathname) {
            nextSuccessPathname = location.state.nextPathname
        }
        var serverErrorMessage = null
        if (!_.isNull(responseStatus) && responseStatus === 401) {
            serverErrorMessage = <h4 style={{marginTop: 20}}><Label bsStyle="danger">Login failed.  Try again.</Label></h4>
        }
        return (
            <div>
                <GasJotHelmet title="Log In" />
                <div className="container"><GasJotNavbar /></div>
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col xs={8} xsOffset={2}>
                            <h1 className="text-center">Log in to your Gas Jot account</h1>
                            { (!_.isNull(serverErrorMessage)) ? serverErrorMessage : "" }
                            <LoginForm
                                onSubmit={() => handleSubmit(nextSuccessPathname)}
                                requestInProgress={requestInProgress} />
                            <hr />
                            <p style={{paddingBottom: 10}}>Don't have an account?  <Link to="/signup">Sign up.</Link></p>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
LogInPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return state.api;
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (nextSuccessPathname) => { dispatch(attemptLogin(nextSuccessPathname)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)
