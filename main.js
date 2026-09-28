const GITHUB_USER = "leonardjy0702";
const MAX_PROJECTS = 6;

/* ---------- theme ---------- */

const root = document.documentElement;
const stored = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
root.dataset.theme = stored ?? (prefersLight ? "light" : "dark");

document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

/* ---------- mobile nav ---------- */

const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  menu?.classList.toggle("is-open", !open);
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    toggle?.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }
});

/* ---------- scroll reveal ---------- */

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---------- footer year ---------- */

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

/* ---------- projects from GitHub ---------- */

const grid = document.getElementById("projects-grid");
const status = document.getElementById("projects-status");

function card(repo) {
  const el = document.createElement("article");
  el.className = "card reveal";

  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = repo.name;
  title.append(link);

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = repo.description ?? "No description yet.";

  const meta = document.createElement("p");
  meta.className = "card-meta";
  if (repo.language) {
    const lang = document.createElement("span");
    lang.className = "card-lang";
    lang.textContent = repo.language;
    meta.append(lang);
  }
  const stars = document.createElement("span");
  stars.textContent = `★ ${repo.stargazers_count}`;
  meta.append(stars);

  el.append(title, desc, meta);
  return el;
}

async function loadProjects() {
  if (!grid) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const repos = (await res.json())
      .filter((repo) => !repo.fork && !repo.archived)
      .slice(0, MAX_PROJECTS);

    status?.remove();
    grid.removeAttribute("aria-busy");

    if (repos.length === 0) {
      const empty = document.createElement("p");
      empty.className = "projects-status";
      empty.textContent = "No public repositories yet — check back soon.";
      grid.append(empty);
      return;
    }

    for (const repo of repos) {
      const node = card(repo);
      grid.append(node);
      observer.observe(node);
    }
  } catch (error) {
    grid.removeAttribute("aria-busy");
    if (status) {
      status.textContent = `Could not load repositories (${error.message}). View them on GitHub instead.`;
    }
  }
}

loadProjects();
