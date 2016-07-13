"use strict";

var gulp = require("gulp");
var path = require("path")
var rename = require("gulp-rename");
var gutil = require("gulp-util");
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
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');

var config = {
    port: 80,
    devBaseUrl: "http://www.gasjot.com",
    paths: {
        ejs: "./src/*.ejs",
        js:   [
            "./src/**/*.js",
            "./src/**/*.jsx"
        ],
        fonts: [
            "./src/fonts/*",
            "node_modules/react-widgets/dist/fonts/*"
        ],
        less: [
            "./src/less/**/*.less"
        ],
        css: [
            "node_modules/bootstrap/dist/css/bootstrap.css",
            "node_modules/bootstrap/dist/css/bootstrap-theme.css",
            "node_modules/react-widgets/dist/css/*",
            "node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css",
            "./src/**/*.css"
        ],
        images:         "./src/images/**",
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
        .pipe(gulp.dest(config.paths.serverRenderDist))
        .pipe(livereload());
});

function createBundler() {
    return browserify({
        entries:      [ config.paths.clientRenderJs ],
        transform:    [ [babelify, {presets: ["es2015", "react", "stage-2"]}] ],
        cache:        {},
        packageCache: {}
    })
}

gulp.task("bundleClientJsAndReload", function() {
    createBundler()
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"))
        .pipe(livereload());
});

gulp.task("bundleClientJs", function() {
    createBundler()
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"));
});

gulp.task("bundleAndCompressClientJs", function() {
    process.env.NODE_ENV = 'production';
    createBundler()
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"));
});

gulp.task("bundleServerJs", function() {
    // there doesn't seem to be a way to invoke the browserify task with the
    // 'node' option, so, need to revert to invoking browserify on the command-line
    exec("mkdir -p dist/server");
    exec("browserify --node " + config.paths.serverJs + " -o " + config.paths.serverRenderDist + "/server.js -t [ envify --NODE_ENV production babelify --presets [ es2015 react stage-2 ] ]");
})

gulp.task("bundle:css", function() {
    gulp.src(config.paths.css)
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"))
        .pipe(livereload());
});

gulp.task("images", function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/images"))
        .pipe(livereload());
});

gulp.task('less', function () {
    return gulp.src(config.paths.less)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"))
        .pipe(livereload());
});

gulp.task("fonts", function() {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/fonts"))
        .pipe(livereload());
});

gulp.task("lint", function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: "eslint.config.json"}))
        .pipe(lint.format());
});

gulp.task("watch", function() {
    livereload.listen();
    gulp.watch(config.paths.images, ["images"]);
    gulp.watch(config.paths.ejs, ["ejs"]);
    gulp.watch(config.paths.css, ["bundle:css"]);
    gulp.watch(config.paths.js, ["bundleClientJsAndReload"]);
});

gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task("dev", ["ejs", "bundleClientJsAndReload", "fonts", "bundle:css", "less", "images", "lint", "watch"]);

gulp.task("build", ["ejs", "bundleClientJs", "bundleServerJs", "fonts", "bundle:css", "less", "images", "lint"]);

gulp.task("buildAndCompress", ["ejs", "bundleAndCompressClientJs", "bundleServerJs", "fonts", "bundle:css", "less", "images", "lint"]);
