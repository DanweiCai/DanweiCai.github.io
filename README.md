# danweicai.github.io

Personal site for Danwei Cai — a single-page Jekyll site served by GitHub Pages
at [danweicai.github.io](https://danweicai.github.io).

To move it to a custom domain later: add a `CNAME` file containing the domain,
point the domain's DNS at GitHub Pages, and update `url` in `_config.yml`.

## Editing the content

All of the content lives in [`_data/resume.yml`](_data/resume.yml) — headline,
projects, experience, skills, education. Edit that file and the page updates;
you should not need to touch the HTML.

- Add a project by appending an entry to `projects`. Set `featured: true` to give
  it the highlighted treatment, use `groups` for a project with several themes of
  work, or a flat `points` list for a simpler one.
- Links, email, and location live in [`_config.yml`](_config.yml) under `profile`.

## Running it locally

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## How it fits together

| File | Role |
| --- | --- |
| `_data/resume.yml` | All page content |
| `index.html` | Section markup, rendered from the data file |
| `_layouts/default.html` | Page shell, SEO tags, theme script |
| `assets/css/style.css` | Styles, including the light and dark themes |
| `assets/js/main.js` | Theme toggle and scroll-reveal animation |

The theme follows the visitor's system preference and can be overridden with the
toggle in the corner; the choice is remembered in `localStorage`. Content is
visible without JavaScript — the scroll animation is an enhancement only.

## Deployment

GitHub Pages builds the `main` branch automatically on push, using its own pinned
Jekyll. The `Gemfile` here is for local previews; the site only uses features
common to both versions.
