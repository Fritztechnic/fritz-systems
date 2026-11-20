<script>
  import { onMount } from 'svelte';

  let dark = $state(false);

  onMount(() => {
    dark = document.documentElement.dataset.theme === 'dark';
  });

  function toggle() {
    dark = !dark;
    const t = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch {}
  }
</script>

<button type="button" onclick={toggle} aria-pressed={dark} aria-label="Dunkles Design">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    {#if dark}
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    {:else}
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
    {/if}
  </svg>
</button>

<style>
  button {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 2px solid var(--fg);
    background: transparent;
    color: var(--fg);
    cursor: pointer;
    transition: background-color 0.15s ease-out, color 0.15s ease-out;
  }
  button:hover { background: var(--fg); color: var(--bg); }
  @media (prefers-reduced-motion: reduce) { button { transition: none; } }
</style>
