import React, { createClass } from "react"
import { Link } from "react-router"

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
                        <a className="navbar-brand" href="index.html">Gas Jot</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li role="presentation" className="active"><a href="index.html">Home</a></li>
                            <li role="presentation"><a href="#">FAQ</a></li>
                            <li role="presentation"><a href="signup.html">Sign up</a></li>
                            <li role="presentation"><Link to="/login">Log in</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});
