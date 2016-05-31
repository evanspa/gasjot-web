import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { logout } from "../actions/actionCreators"
import _ from "lodash"

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
                <LinkContainer to={{ pathname: "/" }} onlyActiveOnIndex><NavItem eventKey={1} role="presentation">Home</NavItem></LinkContainer>
                <NavItem eventKey={2} role="presentation">FAQ</NavItem>
                <LinkContainer to={{ pathname: "/signup" }}><NavItem eventKey={3} role="presentation">Sign up</NavItem></LinkContainer>
                <LinkContainer to={{ pathname: "/login" }}><NavItem eventKey={4}role="presentation">Log in</NavItem></LinkContainer>
            </Nav>)
        } else {
            nav = (<Nav pullRight>
                <LinkContainer to={{ pathname: '/' }} onlyActiveOnIndex><NavItem eventKey={1} role="presentation">Home</NavItem></LinkContainer>
                <NavItem role="presentation" onClick={() => onLogoutClick(logoutUri, authToken)}>Logout</NavItem>
            </Nav>)
        }
        return (
            <Navbar bsStyle="default" fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Gas Jot</Link>
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
