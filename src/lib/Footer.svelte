<footer>
  <span>© {new Date().getFullYear()} Fritz Israel · Königswinter</span>
  <span class="links">
    <a href="/impressum/">Impressum</a>
    <a href="https://github.com/Fritztechnic/fritz-systems" rel="noopener">Quellcode</a>
  </span>
</footer>

<style>
  .links { display: flex; gap: var(--s2); }
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--s1);
    width: min(var(--wrap), 100% - 2.5rem);
    margin: var(--s5) auto 0;
    padding-block: var(--s3);
    border-top: 1px solid var(--rule);
    font: 0.8125rem var(--mono);
    color: var(--muted);
  }
</style>
