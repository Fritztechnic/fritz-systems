<script>
  import '../app.css';
  import Header from '#lib/Header.svelte';
  import Footer from '#lib/Footer.svelte';

  let { children } = $props();
</script>

<a class="skip" href="#main">Zum Inhalt</a>
<div class="shell">
  <Header />
  <main id="main">{@render children()}</main>
  <Footer />
</div>

<style>
  .shell { display: flex; flex-direction: column; min-height: 100vh; }
  main { flex: 1; width: min(var(--wrap), 100% - 2.5rem); margin-inline: auto; }
  .skip { position: absolute; left: -999px; }
  .skip:focus {
    left: var(--s2);
    top: var(--s2);
    z-index: 5;
    padding: 0.5rem 1rem;
    background: var(--fg);
    color: var(--bg);
  }
</style>
