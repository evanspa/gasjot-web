import React, { createClass } from "react"
import { Link } from "react-router"
import Helmet from "react-helmet";

export default createClass({
    render() {
        return (
            <div>
                <Helmet title="Log In" />
                <div className="col-md-6 col-md-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="col-md-8 col-md-offset-2">
                                <h1 className="text-center" style={{marginBottom: "20px"}}>Log in to your Gas Jot account</h1>
                                <form id="login" method="post" action="http://www.jotyourself.com/gasjot/d/login">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Username or Email address</label>
                                        <input type="text" className="form-control" id="username_or_email" placeholder="" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="" />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" id="rememberMe" /> Remember me &#183; <Link to="/forgot-password">Forgot Password?</Link>
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Log in</button>
                                </form>
                                <hr />
                                <p>Don't have an account?  <Link to="/signup">Sign up.</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            /*
               <script type="text/javascript">
               $(document).ready(function() {
               $("#login").submit(GasJot.handleLoginSubmit);
               });
               </script>
             */
        );
    }
});
