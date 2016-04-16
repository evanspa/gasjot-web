import React, { createClass } from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap";
import NavLink from "./navlink.jsx"
import { Navbar, Nav, NavItem } from "react-bootstrap";

export default class GasJotNavbar extends React.Component {

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
        return (
            <Navbar bsStyle="default" fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Gas Jot</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer to={{ pathname: '/' }} onlyActiveOnIndex><NavItem eventKey={1} role="presentation">Home</NavItem></LinkContainer>
                        <NavItem eventKey={2} role="presentation">FAQ</NavItem>
                        <LinkContainer to={{ pathname: '/signup' }}><NavItem eventKey={3} role="presentation">Sign up</NavItem></LinkContainer>
                        <LinkContainer to={{ pathname: '/login' }}><NavItem eventKey={4}role="presentation">Log in</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
