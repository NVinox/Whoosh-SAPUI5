const plugins = require("../plugins.js");
const path = require("../path.js");

module.exports = () => {
    plugins.browserSync.init({
        server: `./${path.srcPath}`,
        port: 3000,
    });
};
