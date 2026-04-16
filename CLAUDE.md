# keeply-blog — Project Instructions

> Hugo-based multilingual blog (19 languages) for keeply.work, deployed via GitHub Pages.

## Architecture

- **Source code**: this repo (`d:\tools\doing\keeply-blog\`)
- **Specs**: `Z:\keeply-blog\` (NAS share, separate git repo for cross-machine sync)
- **IBV framework**: `~\.claude\` + `~\.specify\` (user-level, shared across all projects)

IBV hooks resolve specs location via `IBV_SPECS_DIR` env var (set in [.claude/settings.json](.claude/settings.json)) or fallback to [ibv-config.json](ibv-config.json).

## IBV Verification Commands

| Command | Purpose |
|---|---|
| `hugo server -D` | Dev server with drafts |
| `hugo --gc --minify` | Production build |
| `hugo config` | Validate config syntax |

## PROJECT_CONSTRAINTS

### P0 (hard rules — never violate)

- Static output only — no server-side rendering, no JS frameworks
- 19-language parity: en, zh-tw, zh-cn, ja, ko, de, es, fr, it, pt, ru, nl, pl, tr, vi, th, id, ar, hi
- baseURL must be `https://keeply.work/blog/`
- Theme: hugo-theme-stack (git submodule, not vendored)

### P1 (strong preferences)

- Follow spec phases strictly — no Phase 2+ features in Phase 1
- Prefer Hugo built-in features over custom code
- Content in markdown only, no HTML templates unless necessary

### Module directory pattern

Specs use `{module}/{NNN-slug}/` where module matches `/^(M\d|infra)/`.
