# gasjot-web

gasjot-web is a web application for collecting gas purchase and other data about
your vehicle.  It's a fun application to use to track your gas purchase and
utilization history.

It is implemented as an isomorphic Javascript application using React and
Redux.  The
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used
to communicate with [Gas Jot's REST API](https://github.com/evanspa/pe-gasjot-app).

## About the Gas Jot System

The Gas Jot system is a client/server one.  This repo, *gasjot-web*, represents a client-side application of
the Gas Jot system.  There is also an iOS client application:
[GasJot-ios](https://github.com/evanspa/GasJot-ios).

*FYI, the Gas Jot iOS application is much more featureful than the web app.  The
iOS app offers more charts, offline mode, data export, location-based
conveniences, etc.*

The server-side application of Gas Jot provides a REST API endpoint (*written in
Clojure*) for the client applications to consume:
[pe-gasjot-app](https://github.com/evanspa/pe-gasjot-app).

## Implementation Stack

The following technologies are used to build the Gas Jot web application:

+ [React](https://facebook.github.io/react/)
+ [React Router](https://github.com/reactjs/react-router)
+ [React Bootstrap](https://react-bootstrap.github.io/)
+ [React Chartjs](https://github.com/jhudson8/react-chartjs) (React wrapper for [chart.js](http://www.chartjs.org/))
+ [React Helmet](https://github.com/nfl/react-helmet)
+ [React Widgets](https://jquense.github.io/react-widgets/docs/#/?_k=p3l577)
+ [Redux](http://redux.js.org/) (and [React Redux](https://github.com/reactjs/react-redux))
+ [Redux Form](https://github.com/erikras/redux-form)
+ [Redux Storage](https://github.com/michaelcontento/redux-storage)
+ [React Redux Toastr](https://github.com/diegoddox/react-redux-toastr)
+ [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch)
+ [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/)
+ [Moment](http://momentjs.com/)
+ [Lodash](https://lodash.com/)
+ [Numeral](http://numeraljs.com/)

And for development tooling:

+ [Browserify](http://browserify.org/)
+ [Babel](https://babeljs.io/)
+ [Gulp](http://gulpjs.com/)
