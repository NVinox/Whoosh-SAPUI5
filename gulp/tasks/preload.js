const plugins = require("../plugins.js");
const path = require("../path.js");

module.exports = () => {
  return plugins.gulp
    .src(path.src.preload)
    .pipe(plugins.gulpif("**/*.js", plugins.uglify()))
    .pipe(plugins.gulpif("**/*.xml", plugins.prettydata({ type: "minify" })))
    .pipe(plugins.ui5preload({ base: path.srcPath, namespace: path.srcPath }))
    .pipe(plugins.gulp.dest(path.srcPath));
};
