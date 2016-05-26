"use strict";

var gulp = require("gulp");
var path = require("path")
var rename = require("gulp-rename");
var gutil = require("gulp-util");
//var nodemon = require("gulp-nodemon");
var open = require("gulp-open"); //Open a URL in a web browser
var browserify = require("browserify"); // Bundles JS
var babelify = require("babelify");
var envify = require("envify");
var source = require("vinyl-source-stream"); // Use conventional text streams with Gulp
var buffer = require("vinyl-buffer");
var less = require("gulp-less");
var concat = require("gulp-concat"); //Concatenates files
var lint = require("gulp-eslint"); //Lint JS files, including JSX
var exec = require("child_process").exec;
var watchify = require("watchify");
var lrload = require("livereactload");

var config = {
    port: 80,
    devBaseUrl: "http://www.jotyourself.com",
    paths: {
        ejs: "./src/*.ejs",
        js:   [
            "./src/**/*.js",
            "./src/**/*.jsx"
        ],
        fonts: [
            "./src/fonts/*"
        ],
        less: [
            "./src/less/**/*.less"
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
    },
    isProd: process.env.NODE_ENV === "production"
}

gulp.task("ejs", function() {
    gulp.src(config.paths.ejs)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(config.paths.clientRenderDist));
    gulp.src(config.paths.ejs)
        .pipe(gulp.dest(config.paths.serverRenderDist));
});

function createBundler(useWatchify) {
    return browserify({
        entries:      [ config.paths.clientRenderJs ],
        transform:    [ [babelify, {}], [envify, {}] ],
        plugin:       config.isProd || !useWatchify ? [] : [ lrload ],
        debug:        !config.isProd,
        cache:        {},
        packageCache: {}//,
        //fullPaths:    !config.isProd // for watchify
    })
}

gulp.task("bundle:js", function() {
    createBundler(false)
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"));

    // there doesn't seem to be a way to invoke the browserify task with the
    // 'node' option, so, need to revert to invoking browserify on the command-line
    //exec("mkdir -p dist/server");
    //exec("browserify --node " + config.paths.serverJs + " -o " + config.paths.serverRenderDist + "/server.js -t [ babelify --presets [ es2015 react stage-2 ] ]");
});

gulp.task("watch:js", function() {
    var bundler = createBundler(true)
    var watcher = watchify(bundler)
    rebundle()
    return watcher
        .on("error", gutil.log)
        .on("update", rebundle)

    function rebundle() {
        gutil.log("Update JavaScript bundle")
        watcher
            .bundle()
            .on("error", gutil.log)
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"))
    }
})

//gulp.task("watch:server", function() {
    //nodemon({ script: "server.js", ext: "js", ignore: ["gulpfile.js", "bundle.js", "node_modules/*"] })
      //  .on("change", function () {})
//        .on("restart", function () {
  //          console.log("Server restarted")
    //    })
//})

gulp.task("bundle:css", function() {
    gulp.src(config.paths.css)
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"));
});

gulp.task("images", function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/images"));
});

gulp.task('less', function () {
    return gulp.src(config.paths.less)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"));
});


gulp.task("fonts", function() {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/fonts"));
});

gulp.task("lint", function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: "eslint.config.json"}))
        .pipe(lint.format());
});

gulp.task("watch", function() {
    gulp.watch(config.paths.ejs, ["ejs"]);
    gulp.watch(config.paths.css, ["css"]);
    //gulp.watch(config.paths.js, ["js", "lint"]); // now handled by watchify
});

//gulp.task("default", ["ejs", "bundle:js", "fonts", "bundle:css", "less", "images", "lint", "watch"]);
gulp.task("default", ["ejs", "watch:js", "fonts", "bundle:css", "less", "images", "lint", "watch"]);
