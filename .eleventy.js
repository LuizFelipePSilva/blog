const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc");

module.exports = function (eleventyConfig) {
  const mdOptions = { html: true, linkify: true, typographer: true };
  const md = markdownIt(mdOptions).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapper: "div",
    ul: true,
  });

  eleventyConfig.addFilter("agruparPorData", (postsCollection) => {
    const postsOrdenados = postsCollection.sort((a, b) => b.date - a.date);
    const grupos = new Map();
    postsOrdenados.forEach((post) => {
      const dataFormatada = post.date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      const tituloGrupo =
        dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
      if (!grupos.has(tituloGrupo)) grupos.set(tituloGrupo, []);
      grupos.get(tituloGrupo).push(post);
    });
    return Array.from(grupos, ([data, posts]) => ({ data, posts }));
  });

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("posts/*.md"),
  );

  return {
    dir: { input: ".", includes: "_includes", output: "_site" },
    pathPrefix: "/blog/", // <-- **ESSENCIAL**: ajuste para o nome do repo
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
