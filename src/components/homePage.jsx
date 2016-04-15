import React, { createClass } from "react"
import { Link } from "react-router"
import Helmet from "react-helmet";

export default createClass({
    render() {
        return (
            <div>
                <Helmet title="Home" />
                <div className="container col-md-6 col-md-offset-3">
                    <div className="jumbotron">
                        <h1>Welcome to Gas Jot</h1>
                        <p className="lead">A fun way to track your gas usage.</p>
                        <p><Link className="btn btn-lg btn-success" to="/signup" role="button">Sign up today</Link></p>
                    </div>
                    <div className="row marketing">
                        <div className="container col-md-12">
                            <h4>What is Gas Jot?</h4>
                            <p>Gas Jot is a fun way to track your gas usage.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
