<!-- BWF: v0.1 -->
# CLAUDE.md — keeply-blog

> Hugo-based multilingual blog (19 languages) for keeply.work, deployed via GitHub Pages.
> 寫作框架：BWF v0.1 minimum viable（`~/.claude/bwf/`）。

---

## Architecture

- **Source code**: this repo (`d:\tools\doing\keeply-blog\`)
- **BWF specs（寫作產物）**: 本地 `specs/{slug}/`（gitignored；推送目的地 `Z:\keeply-blog\`，使用者手動同步）
- **IBV specs（工程產物，保留）**: `Z:\keeply-blog\` (NAS，IBV hooks 讀 `IBV_SPECS_DIR` 或 `ibv-config.json`)
- **BWF framework**: `~/.claude/bwf/`（user-level，跨寫作專案共享）
- **IBV framework**: `~/.claude/` + `~/.specify/`（user-level）

Note：`Z:\keeply-blog\` 需要 `git config --global --add safe.directory '%(prefix)///192.168.0.7/Projects/keeply-blog'` 才能從本機操作。

## Hugo / IBV Verification Commands

| Command              | Purpose                |
| -------------------- | ---------------------- |
| `hugo server -D`     | Dev server with drafts |
| `hugo --gc --minify` | Production build       |
| `hugo config`        | Validate config syntax |

## Publishing schedule

- Each post's front-matter sets `date: YYYY-MM-DDT09:00:00+08:00` to its target publish moment
- Cadence: 週二 / 週五 09:00 Asia/Taipei（Mode A — 穩健）
- `.github/workflows/deploy.yml` runs `cron: "0 1 * * *"` (daily 01:00 UTC = 09:00 Asia/Taipei). Hugo skips posts whose `date` is in the future, so a future-dated post first appears in the build that runs on/after that timestamp — native scheduled publishing, no extra tooling
- During Touch 4 DELIVER, fill `date` for every `final.{locale}.md` to the same target timestamp across locales (don't stagger by language)
- Cron timing is best-effort — GitHub may delay the run by up to ~30 min on busy public-runner queues. Acceptable for blog publishing; not acceptable for hard deadlines

---

## BWF PROJECT_CONSTRAINTS

## P0 — 絕對規則（零容忍）

- **P0.1** 禁用 Git 術語。永不。散文、隱喻、類比都不行。
  禁用詞：commit、branch、rebase、merge、HEAD、diff、push、pull、stash、repository、checkout、master、main、origin
- **P0.2** 永不把 Keeply 定位為「給非開發者的 Git」。Keeply 不是 Git-derived，是為了讓不學 Git 的人也能管檔案歷史。
- **P0.3** 禁寫競品 hit-piece。比較文必須事實、具體、承認對方何時是對的選擇。
- **P0.4** 禁捏造統計。每個數字必須有外部可訪問 URL 引用（學術、機構、大廠公開調查）。內部估算不得作為論證主幹；只能在已有外部引用旁做補充運算（例：外部研究顯示 X → 本文換算 Y）。若找不到外部引用，刪掉數字用定性論述。
- **P0.5** 客戶姓名/引言：必須能在 `specs/{slug}/sources.md` 追到具體人+日期+同意紀錄，或用「【合成範例】」前綴明確標記。未經書面同意禁用真實姓名。
- **P0.6** AI-tell phrases 零命中（對照 `~/.claude/bwf/traps.md`）。
- **P0.7** 原文用英文。文化中立——無美式慣用語、運動比喻、流行文化引用。

## P0 — Hugo / Infra 硬規則（承接 Phase 1）

- Static output only — no server-side rendering, no JS frameworks
- 19-language parity: en, zh-tw, zh-cn, ja, ko, de, es, fr, it, pt, ru, nl, pl, tr, vi, th, id, ar, hi
- baseURL must be `https://blog.keeply.work/`
- Theme: hugo-theme-stack (git submodule, not vendored)

## P1 — 強偏好（覆寫需註記）

- **P1.1** 段落 ≤3 行桌面顯示（≤75 字）。
- **P1.2** 子標題使用 sentence case，前 2 字要資訊承載。
- **P1.3** H1 下方必有 Deck（1 句 ≤45 字）。
- **P1.4** 文章 ≥800 字要有連結 TOC。
- **P1.5** 每 ~600 字一個 bucket brigade。
- **P1.6** D-voice：反骨溫暖第二人稱。預設 address: 「你」。
- **P1.7** 每大區段至少一個具體軼事或具體數字。
- **P1.8** Flesch Reading Ease ≥60（ICP：設計師/建築師/律師/會計師）。
- **P1.9** 文章 1,200–2,200 字，除 T6 Founder Note（300–800）。
- **P1.10** Hugo front-matter 必有：title、description、date、tags、draft、primary_keyword、locales。
- **P1.11** SEO 標題規則：primary_keyword 出現在標題前半（zh 前 3-5 字；en 前 30 char）；標題含具體數字或 hook；長度 zh 28-35 全形字、en 50-60 char。寫完後做「雙版本檢查」：一版為 voice 寫、一版為 SEO 寫，合併較好部分。
- **P1.12** 引用格式：每個統計數字 inline markdown link 到原始來源；來源優先序：學術/大型機構 > 大廠公開調查 > 媒體二手（後者要再追到原始）。所有引用同步登錄 `specs/{slug}/sources.md`。
- Prefer Hugo built-in features over custom code
- Content in markdown only, no HTML templates unless necessary

---

## Locale Policy

**發布時必有**：en, zh-TW, zh-CN, ja
**自動翻譯**：es, pt-BR, de, fr, it, ko, vi, th, id, tr, ar, ru, nl, pl, sv（共 19 語言）
**特殊處理**：

- 阿拉伯文（ar）需要 RTL 審查
- 德文（de）+30% 字元寬度緩衝

所有 locales 都要跑 GATE-4 翻譯安全 + SEO 檢查。

## Voice Corpus

未來放 `voice_corpus/` 的典範文章（寫過 3-5 篇後建立）。

目前：第一篇文章 `specs/hidden-cost-shared-folders/` 作為 back-filled 範例。

## 目錄結構

```text
keeply-blog/
├── CLAUDE.md                  # 本檔
├── hugo.toml                   # Hugo 設定
├── content/{locale}/posts/     # 發布內容
├── specs/                      # BWF 設計產物（gitignored；同步到 Z:\keeply-blog\）
│   └── {slug}/
│       ├── intent.md
│       ├── angle.md
│       ├── skeleton.md
│       ├── draft.en.md
│       ├── final.{locale}.md
│       └── learnings.md
└── voice_corpus/               # 典範文章（暫空）
```

## BWF 版本

v0.1 最小可跑版。已實作：T1 Pillar 模板、4 個 GATE、TRAP 列表、hooks/titles/ctas library、`/blg` slash command。

未實作（v0.2+）：T2-T6 模板、Python lint 腳本、LoopGuard 自動化、feedforward.xml、learnings.md 彙整 job、`specs/` 同步到 `Z:\keeply-blog\` 自動化。
