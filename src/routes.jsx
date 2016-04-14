import React from "react"
import App from "./components/app.jsx"
import HomePage from "./components/homePage.jsx"
import NotFoundPage from "./components/notFoundPage.jsx"
import LoginPage from "./components/login.jsx"
import { Router, Route, IndexRoute, Link } from "react-router"

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);

/*var Routes = (
    <Route name="app" path="/" handler={require('./components/app.jsx')}>
        <DefaultRoute handler={require('./components/homePage.jsx')} />
        <Route name="fag" handler={require('./components/faq.jsx')} />
        <Route name="signup" handler={require('./components/signup.jsx')} />
        <Route name="login" handler={require('./components/login.jsx')} />
        <NotFoundRoute handler={require('./components/notFoundPage.jsx')} />
    </Route>
);*/
