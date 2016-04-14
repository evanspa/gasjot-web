import React, { createClass } from "react"

export default createClass({
    render() {
        return (
            <div className="container col-md-6 col-md-offset-3">
                <div className="jumbotron">
                    <h1>Welcome to Gas Jot</h1>
                    <p className="lead">A fun way to track your gas usage.</p>
                    <p><a className="btn btn-lg btn-success" href="signup.html" role="button">Sign up today</a></p>
                </div>
                <div className="row marketing">
                    <div className="container col-md-12">
                        <h4>What is Gas Jot?</h4>
                        <p>Gas Jot is a fun way to track your gas usage.</p>
                    </div>
                </div>
            </div>
        );
    }
});
