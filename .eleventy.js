const pluginSass = require("eleventy-plugin-sass");
const CleanCSS = require("clean-css");

const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

const sal = require('sal.js');

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib)

  // Add CSS minifier
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/js/');

  eleventyConfig.addPassthroughCopy({
    "node_modules/sal.js/dist/sal.css": "sal.css",
    "node_modules/sal.js/dist/sal.js": "js/sal.js"
  });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
};
};
