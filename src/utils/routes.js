/*
  Hash routes mirroring the panel's state. The site is one 3D scene plus a
  panel, so nothing ever reloads — the URL only has to describe which view is
  showing, which a fragment does without a router, a dev-server rewrite or a
  Netlify _redirects file.

  A route is null when the panel is closed, otherwise { tab, slug }. `slug` is
  set only on a project sub-page.
*/

export const TABS = ['about', 'projects', 'contact'];

const SITE_TITLE = 'Jake Rose';

// Derived rather than stored on each project, so a renamed title cannot leave a
// stale slug behind. assertUniqueSlugs below catches the one case that breaks.
export const slugify = (title) => title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const findBySlug = (projects, slug) =>
    projects.find((project) => slugify(project.title) === slug) ?? null;

/*
  Anything the URL cannot describe falls back rather than leaving the panel in a
  state the address bar disagrees with: an unknown tab closes it, an unknown
  project slug lands on the projects list.
*/
export const parseHash = (hash, projects) => {
    const path = String(hash || '').replace(/^#\/?/, '').replace(/\/+$/, '');
    if (!path) return null;

    const [tab, slug] = path.split('/');
    if (!TABS.includes(tab)) return null;
    if (tab !== 'projects' || !slug) return { tab, slug: null };

    return { tab: 'projects', slug: findBySlug(projects, slug) ? slug : null };
};

export const hashFor = (route) => {
    if (!route) return '';
    return route.slug ? `#/projects/${route.slug}` : `#/${route.tab}`;
};

export const titleFor = (route, projects) => {
    if (!route) return SITE_TITLE;

    if (route.slug) {
        const project = findBySlug(projects, route.slug);
        if (project) return `${project.title} · Jake Rose`;
    }

    return `${route.tab[0].toUpperCase()}${route.tab.slice(1)} · Jake Rose`;
};

/*
  Two projects whose titles slugify the same would make one of them
  unreachable by URL, and it would fail silently. Dev only — Vite folds the
  flag to a literal, so this leaves the production bundle.
*/
export const assertUniqueSlugs = (projects) => {
    if (!import.meta.env.DEV) return;

    const seen = new Map();
    projects.forEach((project) => {
        const slug = slugify(project.title);
        if (seen.has(slug)) {
            console.warn(`[routes] "${project.title}" and "${seen.get(slug)}" both slugify to "${slug}" — one is unreachable by URL.`);
        }
        seen.set(slug, project.title);
    });
};
