const plugins = require("../plugins.js");
const path = require("../path.js");

module.exports = () => {
    return plugins.del(path.dist.css);
};
