# gasjot-web

gasjot-web is a web application for collecting gas purchase and other data about
your vehicle.  It's a fun application to use to track your gas purchase and
utilization history.

**Table of Contents**

- [About the Gas Jot System](#about-the-gas-jot-system)
  - [Implementation Stack](#implementation-stack)
  - [Server-side Application](#server-side-application)

## About the Gas Jot System

The Gas Jot system is a client/server one.  This repo, *gasjot-web*, represents a client-side application of
the Gas Jot system.  There is also an iOS client application:
[GasJot-ios](https://github.com/evanspa/GasJot-ios).

### Implementation Stack

The following technologies are used to build the Gas Jot web application:

+ React
+ React Router
+ React Bootstrap
+ React Chartjs
+ React Helmet
+ React Widgets
+ Redux (and React Redux)
+ Redux Form
+ Redux Storage
+ React Redux Toastr
+ Isomorphic Fetch
+ Babel Polyfill
+ Moment
+ Lodash
+ Numeral

And for development tooling:

+ Browserify
+ Babel
+ Gulp

### Server-side Application

The server-side application of Gas Jot provides a REST API endpoint (*written in
Clojure*) for the client applications to consume:
[pe-gasjot-app](https://github.com/evanspa/pe-gasjot-app).
