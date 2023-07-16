const srcPath = "webapp";
const distPath = "webapp/assets";

module.exports = {
    srcPath,
    src: {
        scss: "src/scss/**/*.scss",
        server: `${srcPath}/**/*.{js,xml,html}`,
        preload: `${srcPath}/**/*.{js,xml}`,
    },
    dist: {
        css: `${distPath}/styles/`,
    },
    watch: {
        scss: `src/scss/**/*.scss`,
        server: `${srcPath}/**/*.{js,xml,html}`,
    },
};
