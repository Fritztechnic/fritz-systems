<script>
  import { page } from '$app/state';
  import ThemeToggle from './ThemeToggle.svelte';

  const nav = [
    ['/', 'Start'],
    ['/projekte/', 'Projekte'],
    ['/blog/', 'Blog'],
    ['/ueber-mich/', 'Über mich'],
    ['/kontakt/', 'Kontakt']
  ];

  const current = (href) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header>
  <a href="/" class="mark">
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <rect width="32" height="32" fill="currentColor" />
      <path d="M9 24V8h13v4H13.5v3H21v4h-7.5v5z" fill="var(--signal)" />
    </svg>
    fritz.systems
  </a>
  <nav aria-label="Hauptnavigation">
    {#each nav as [href, label]}
      <a {href} aria-current={current(href) ? 'page' : undefined}>{label}</a>
    {/each}
    <ThemeToggle />
  </nav>
</header>

<style>
  header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--s2) var(--s3);
    width: min(var(--wrap), 100% - 2.5rem);
    margin-inline: auto;
    padding-block: var(--s3);
    font: 0.875rem var(--mono);
  }
  a { text-decoration: none; }
  .mark { display: flex; align-items: center; gap: 0.65rem; font-weight: 700; }
  .mark:hover { color: var(--fg); }
  nav { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s1) var(--s3); }
  nav a { padding-block: 0.15rem; border-bottom: 2px solid transparent; }
  nav a:hover { border-color: var(--rule); color: var(--fg); }
  nav a[aria-current] { border-color: var(--signal); }
</style>
