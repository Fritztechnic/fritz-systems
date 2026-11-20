<script>
  import { page } from '$app/state';
  import Arrow from '#lib/Arrow.svelte';
</script>

<svelte:head><title>{page.status} – Fritz Israel</title></svelte:head>

<article class="prose">
  <p class="meta">Fehler {page.status}</p>
  <h1>{page.status === 404 ? 'Seite nicht gefunden' : 'Da ist etwas schiefgegangen'}</h1>
  <p><a href="/">Zur Startseite <Arrow /></a></p>
</article>
