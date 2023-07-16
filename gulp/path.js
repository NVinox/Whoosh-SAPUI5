const srcPath = "webapp";
const distPath = "webapp/assets";

module.exports = {
    srcPath,
    src: {
        scss: "src/scss/**/*.scss",
    },
    dist: {
        css: `${distPath}/styles/`,
    },
    watch: {
        scss: `src/scss/**/*.scss`,
        server: `${srcPath}/**/*.*`,
    },
};
