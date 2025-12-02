---
layout: layout.njk
title: Home
templateEngineOverride: njk, md
---

<div class="archive">
  {# O resto do código continua igual... #}
  {% set grupos = collections.posts | agruparPorData %}

{% for grupo in grupos %}

<div class="archive-group">
<h2 class="archive-date">{{ grupo.data }}</h2>
<ul class="post-list">
{% for post in grupo.posts %}
<li>
<a href="{{ post.url }}">{{ post.data.title }}</a>
<span class="post-day">
{{ post.date.toLocaleDateString('pt-BR', { day: 'numeric', timeZone: 'UTC' }) }}
</span>
</li>
{% endfor %}
</ul>
</div>
{% endfor %}

</div>
