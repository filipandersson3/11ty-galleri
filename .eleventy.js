module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addWatchTarget("src/images");

    eleventyConfig.addShortcode('image', (src, alt) => `<img alt="${alt}" src="${src}">`);

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};