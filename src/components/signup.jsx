import React, { createClass } from "react"
import { Link } from "react-router"
import Helmet from "react-helmet";

export default createClass({
    render() {
        return (
            <div>
                <Helmet title="Sign Up" />
                <div className="col-md-6 col-md-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="col-md-8 col-md-offset-2">
                                <h1 className="text-center" style={{marginBottom: "20px"}}>Sign up for Riker</h1>
                                <form id="signup" method="post" action="http://www.rikerapp.com/riker/d/users">
                                    <div className="form-group">
                                        <label for="name">Your name</label>
                                        <input id="fullname" type="text" className="form-control" placeholder="e.g., Bruce Jones" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input id="email" type="email" className="form-control" id="exampleInputEmail1" placeholder="e.g., bruce@gmail.com" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input id="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="e.g., &#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Sign up</button>
                                </form>
                                <hr />
                                <p>Already have an account?  <Link to="/login">Log in.</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
