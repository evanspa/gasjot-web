//import "intl"
//import "intl/locale-data/jsonp/en.js"
import express from "express";
import React from "react";
import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux'
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import rootReducer from "./reducers/index"
import thunk from 'redux-thunk'
import Helmet from "react-helmet";
import { initialState } from "./store/configureStore"
import createRoutes from "./Routes.jsx";
import {IntlProvider} from 'react-intl';
import ReduxToastr from 'react-redux-toastr'

console.log("inside server.js!")

const app = express();

app.set("views", "./dist/server");
app.set("view engine", "ejs");

app.get("*", (req, res) => {
    const store = compose(
        applyMiddleware(thunk, routerMiddleware(browserHistory))
    )(createStore)(
        rootReducer,
        initialState
    )
    const routes = createRoutes(store, true);

    match({ routes, location: req.url }, (err, redirectLocation, props) => {
        if (err) {
            // something went badly wrong, so 500 with a message
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            // we matched a ReactRouter redirect, so redirect from the server
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (props) {
            const initialView = (
                <Provider store={store}>
                    <IntlProvider locale="en">
                        <div>
                            <RouterContext {...props} />
                            <ReduxToastr position="top-left" />
                        </div>
                    </IntlProvider>
                </Provider>
            );
            //const renderedAppBody = renderToString(<RouterContext {...props} />);
            const renderedAppBody = renderToString(initialView);
            let head = Helmet.rewind();

            // render `index.ejs`, but pass in the markup we want it to display
            res.render("index", { appBody: renderedAppBody, headTitle: head.title });

        } else {
            // no route match, so 404. In a real app you might render a custom
            // 404 view here
            res.sendStatus(404);
        }
    });
});

app.listen(3003, "localhost", function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Listening at http://localhost:3003");
});
