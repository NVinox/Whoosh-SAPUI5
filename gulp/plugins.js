const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const csso = require("gulp-csso");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

module.exports = {
    gulp,
    del,
    sass,
    autoprefixer,
    cssbeautify,
    csso,
    removeComments,
    rename,
    browserSync,
    notify,
    plumber,
};
