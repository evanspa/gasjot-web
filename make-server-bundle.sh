#!/bin/bash

browserify --node src/server.js -o dist/server/scripts/bundle2.js -t [babelify --presets [ es2015 react ] ]
