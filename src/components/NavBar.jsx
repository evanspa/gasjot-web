import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { logout } from "../actions/actionCreators"
import _ from "lodash"
import * as urls from "../urls"

class GasJotNavbar extends React.Component {

    // https://github.com/react-bootstrap/react-router-bootstrap/issues/112#issuecomment-142599003
    componentDidMount() {
        const navBar = ReactDOM.findDOMNode(this);
        const collapsibleNav = navBar.querySelector('div.navbar-collapse');
        const btnToggle = navBar.querySelector('button.navbar-toggle');
        navBar.addEventListener('click', (evt) => {
            if (evt.target.tagName !== 'A' || evt.target.classList.contains('dropdown-toggle') || ! collapsibleNav.classList.contains('in')) {
                return;
            }
            btnToggle.click();
        }, false);
    }

    render() {
        const { authToken, onLogoutClick, logoutUri } = this.props
        var nav
        if (_.isEmpty(authToken)) {
            nav = (<Nav pullRight>
                <LinkContainer to={{ pathname: urls.ROOT_URI }} onlyActiveOnIndex><NavItem eventKey={1} role="presentation">Home</NavItem></LinkContainer>
                <NavItem eventKey={2} role="presentation">FAQ</NavItem>
                <LinkContainer to={{ pathname: urls.SIGNUP_URI }}><NavItem eventKey={3} role="presentation">Sign up</NavItem></LinkContainer>
                <LinkContainer to={{ pathname: urls.LOGIN_URI }}><NavItem eventKey={4}role="presentation">Log in</NavItem></LinkContainer>
            </Nav>)
        } else {
            nav = (<Nav pullRight>
                <LinkContainer to={{ pathname: urls.ROOT_URI }} onlyActiveOnIndex><NavItem eventKey={1} role="presentation">Home</NavItem></LinkContainer>
                <LinkContainer to={{ pathname: urls.ACCOUNT_URI }}><NavItem eventKey={2} role="presentation">Account</NavItem></LinkContainer>
                <LinkContainer to={{ pathname: urls.SETTINGS_URI }}><NavItem eventKey={2} role="presentation">Settings</NavItem></LinkContainer>
            </Nav>)
        }
        return (
            <Navbar bsStyle="default" fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={urls.ROOT_URI}>Gas Jot</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {nav}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    const logoutLink = state.serverSnapshot._links.logout;
    var logoutUri = ""
    if (!_.isEmpty(logoutLink)) {
        logoutUri = logoutLink.href;
    }
    return {
        authToken: state.authToken,
        logoutUri: logoutUri
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: (logoutUri, authToken) => {
            dispatch(logout(logoutUri, authToken))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasJotNavbar)
