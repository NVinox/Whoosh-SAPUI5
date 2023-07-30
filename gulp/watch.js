const { gulp } = require("./plugins.js");
const css = require("./tasks/css.js");
const serverReload = require("./tasks/serverReload.js");
const path = require("./path.js");

module.exports = () => {
  gulp.watch([path.watch.scss], css);
  gulp.watch([path.watch.server], serverReload);
};
