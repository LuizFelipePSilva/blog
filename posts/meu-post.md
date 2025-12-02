---
layout: layout.njk
title: Publicando meu blog pela primeira vez
date: 2025-11-27
---

# Como está sendo publicar no meu blog pela primeira vez

## Inspiração, by Akita.

Andei procurando na web, algo que pudesse me ajudar a criar um blog, parecido com o do Akita, como me inspiro. Basicamente eu vi que ele fazia o blog no Ruby, e pensei, hmm, porque não utilizar nodejs nisso, então busquei oque seria possivel fazer isso e me deparei com o eleventy.
Basicamente eu fiz o dowload com:

```bash
npm i @11ty/eleventy --save-dev
```

Estrutura inicial do projeto abaixo:

```bash
├── \_includes
│   └── layout.njk
├── index.md
├── posts
│   ├── meu-post.md
│   └── segundo-post.md
├── readme.md
├── styles/
│   ├── main.css
└── .eleventy.js
```

Onde o index.md é o inicial onde eu crio a pagina incial, e inicializo o arquivo e escrevo, onde eu consigo documentar e ficar tudo bonito(digamos), eu sofri um pouco para criar o toc para deixar os principais na pagina e principalmente o estilo e colocar as rotas. eu criei o .eleventy.js

```js
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
    pathPrefix: "/blog/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
```

Nesse documento eu ajustei as rotas quando clicar e ainda ajustei o toc para ficar dentro dos arquivos. e assim quando eu clicar em Inspiração, by Akita. ele ir para o topico apresentado. Este topico foi resumido.
