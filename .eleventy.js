const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc"); // 1. Importar o plugin novo

module.exports = function (eleventyConfig) {
  const mdOptions = {
    html: true,
    linkify: true,
    typographer: true,
  };

  const md = markdownIt(mdOptions).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(), // Opcional: cria links no próprio título
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"], // Quais níveis de título devem aparecer
    wrapper: "div", // Envolve a lista em uma div (opcional)
    ul: true, // Usa <ul> ao invés de <ol>
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

      if (!grupos.has(tituloGrupo)) {
        grupos.set(tituloGrupo, []);
      }

      grupos.get(tituloGrupo).push(post);
    });

    return Array.from(grupos, ([data, posts]) => ({ data, posts }));
  });
  eleventyConfig.addPassthroughCopy("styles");

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("posts/*.md"),
  );
};
