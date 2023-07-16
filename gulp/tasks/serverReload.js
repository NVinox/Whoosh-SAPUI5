const path = require("../path.js");
const plugins = require("../plugins.js");

module.exports = () => {
    return plugins.gulp.src(path.src.server).pipe(plugins.browserSync.reload({ stream: true }));
};
