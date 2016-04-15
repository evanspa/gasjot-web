import React from "react"
import App from "./components/app.jsx"
import HomePage from "./components/homePage.jsx"
import NotFoundPage from "./components/notFoundPage.jsx"
import LoginPage from "./components/login.jsx"
import SignUpPage from "./components/signup.jsx"
import { Router, Route, IndexRoute, Link } from "react-router"

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
