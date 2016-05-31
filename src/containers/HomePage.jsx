import React, { createClass } from "react"
import { connect } from 'react-redux'
import _ from "lodash"
import AuthHomePage from "./AuthenticatedHomePage.jsx"
import UnauthHomePage from "./UnauthenticatedHomePage.jsx"

class HomePage extends React.Component {
    render() {
        const { authToken } = this.props
        if (_.isEmpty(authToken)) {
            return <UnauthHomePage />
        } else {
            return <AuthHomePage />
        }
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
HomePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        authToken: state.authToken
    }
}

export default connect(mapStateToProps)(HomePage)
