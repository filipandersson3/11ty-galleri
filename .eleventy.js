const moment = require('moment');
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300],
      formats: ["avif", "jpeg"],
      outputDir: "./dist/img"
    });
  
    let imageAttributes = {
      alt,
      sizes: sizes || "",
      loading: "lazy",
      decoding: "async",
    };
  
    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  }
  

module.exports = function(eleventyConfig) {

    //eleventyConfig.addShortcode('image', (src, alt) => `<img alt="${alt}" src="${src}">`);
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);

    eleventyConfig.addFilter("makeUppercase", function(value) { return value.toUpperCase(); });

    eleventyConfig.addFilter("dateFilter", function(value) { moment.locale('sv'); return moment(value).format('MMMM Do YYYY'); });

    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};