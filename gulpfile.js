"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var open = require("gulp-open"); //Open a URL in a web browser
var browserify = require("browserify"); // Bundles JS
var babelify = require("babelify");
var source = require("vinyl-source-stream"); // Use conventional text streams with Gulp
var concat = require("gulp-concat"); //Concatenates files
var lint = require("gulp-eslint"); //Lint JS files, including JSX
var exec = require('child_process').exec;

var config = {
    port: 80,
    devBaseUrl: "http://www.jotyourself.com",
    paths: {
        ejs: "./src/*.ejs",
        js:   [
            "./src/**/*.js",
            "./src/**/*.jsx"
        ],
        css: [
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
            "./src/**/*.css"
        ],
        images:         "./src/images/*",
        favicon:        "./src/favicon.ico",
        clientRenderJs: "./src/client-render.jsx",
        serverJs:       "./src/server.js",
        clientRenderDist: "./dist/client",
        serverRenderDist: "./dist/server"
    }
}

gulp.task("ejs", function() {
    gulp.src(config.paths.ejs)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(config.paths.clientRenderDist));
    gulp.src(config.paths.ejs)
        .pipe(gulp.dest(config.paths.serverRenderDist));
});

gulp.task("js", function() {
    browserify(config.paths.clientRenderJs)
        .transform("babelify", {presets: ["es2015", "react", "stage-2"]})
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"));

    // there doesn't seem to be a way to invoke the browserify task with the
    // 'node' option, so, need to revert to invoking browserify on the command-line
    exec("mkdir -p dist/server");
    exec("browserify --node " + config.paths.serverJs + " -o " + config.paths.serverRenderDist + "/server.js -t [ babelify --presets [ es2015 react stage-2 ] ]");
});

gulp.task("css", function() {
    gulp.src(config.paths.css)
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"));
});

gulp.task("images", function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/images"));
});

gulp.task("lint", function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: "eslint.config.json"}))
        .pipe(lint.format());
});

gulp.task("watch", function() {
    gulp.watch(config.paths.ejs, ["ejs"]);
    gulp.watch(config.paths.css, ["css"]);
    gulp.watch(config.paths.js, ["js", "lint"]);
});

gulp.task("default", ["ejs", "js", "css", "lint", "watch"]);
