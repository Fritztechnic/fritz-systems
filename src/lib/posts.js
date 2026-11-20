const metas = import.meta.glob('/src/posts/*.md', { import: 'metadata', eager: true });
const bodies = import.meta.glob('/src/posts/*.md', { import: 'default', eager: true });
const raws = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default', eager: true });

export const posts = Object.entries(metas)
  .map(([path, meta]) => {
    const words = (raws[path].match(/\p{L}+/gu) ?? []).length;
    return {
      ...meta,
      slug: path.split('/').pop().replace(/\.md$/, ''),
      minutes: Math.max(1, Math.round(words / 200)),
      component: bodies[path]
    };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso) =>
  new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
