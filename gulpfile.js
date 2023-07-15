const { gulp } = require("./gulp/plugins.js");
const server = require("./gulp/tasks/server.js");
const plugins = require("./gulp/plugins.js");
const path = require("./gulp/path.js");

// Task для запуска в режиме разработки
const dev = gulp.parallel(() => {
    gulp.watch([path.watch.server], () => {
        return gulp.src(path.watch.server).pipe(plugins.browserSync.reload({ stream: true }));
    });
}, server);

gulp.task("dev", dev);
