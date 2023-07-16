const { gulp } = require("./gulp/plugins.js");
const server = require("./gulp/tasks/server.js");
const css = require("./gulp/tasks/css.js");
const clean = require("./gulp/tasks/clean.js");
const watcher = require("./gulp/watch.js");

// Task для запуска основных задач
const build = gulp.series(clean, css);

// Task для запуска в режиме разработки
const dev = gulp.series(build, gulp.parallel(watcher, server));

gulp.task("dev", dev);
