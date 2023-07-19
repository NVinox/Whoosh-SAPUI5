const plugins = require("../plugins.js");
const path = require("../path.js");
const dotenv = require("dotenv").config();

module.exports = () => {
    plugins.browserSync.init({
        server: `./${path.srcPath}`,
        port: process.env.SERVER_PORT,
    });
};
