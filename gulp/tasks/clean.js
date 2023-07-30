const plugins = require("../plugins.js");
const path = require("../path.js");

const cleanCss = () => {
  return plugins.del(path.dist.css);
};

const cleanPreload = () => {
  return plugins.del(`${path.srcPath}/Component-preload.js`);
};

module.exports = { cleanCss, cleanPreload };
