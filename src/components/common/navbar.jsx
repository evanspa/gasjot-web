import React, { createClass } from "react"
import { Link } from "react-router"
import NavLink from "./navlink.jsx"

export default createClass({
    render() {
        return (
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink className="navbar-brand" to="/">Home</NavLink>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li role="presentation"><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
                            <li role="presentation"><a href="#">FAQ</a></li>
                            <li role="presentation"><NavLink to="/signup">Sign up</NavLink></li>
                            <li role="presentation"><NavLink to="/login">Log in</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});
