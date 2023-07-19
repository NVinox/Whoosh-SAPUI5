const { gulp } = require("./gulp/plugins.js");
const server = require("./gulp/tasks/server.js");
const css = require("./gulp/tasks/css.js");
const preload = require("./gulp/tasks/preload.js");
const watcher = require("./gulp/watch.js");
const { cleanCss, cleanPreload } = require("./gulp/tasks/clean.js");

// Task для запуска основных задач
const build = gulp.series(cleanCss, cleanPreload, css, preload);

// Task для запуска в режиме разработки
const dev = gulp.series(cleanCss, css, gulp.parallel(watcher, server));

gulp.task("build", build);
gulp.task("dev", dev);
