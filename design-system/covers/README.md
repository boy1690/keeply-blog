# Keeply Cover Kit

可組合的 SVG 零件庫，每篇文章挑選組合產生封面。

## 為什麼不用統一模板

套版封面會讓部落格看起來像內容農場。這個 kit 讓每張封面「用相同零件但不同組合」——視覺連貫但每篇獨一。

## 結構

```text
design-system/covers/
├── README.md              ← 你在看
├── symbols.svg            ← 所有零件的原始定義
├── generate-png.sh        ← 批次 SVG → PNG 轉檔
└── examples/              ← 各文章類型的範例封面（含註解）
```

## 如何組合一張新封面

1. 在新文章的 page bundle 建立 `cover.svg`（路徑：`content/{locale}/post/{slug}/cover.svg`）
2. 從 `symbols.svg` **複製** `<defs>` 和你需要的 `<symbol>` 區塊到新檔（inline 自包含，避免跨檔 `<use>` 瀏覽器相容問題）
3. 用 `<use href="#symbol-id" x y width height/>` 組合場景
4. 在 index.md front-matter 加：

   ```yaml
   image: cover.svg         # 站內顯示用（向量，crisp）
   og_image: cover.png      # 社交卡用（Twitter/FB 不吃 SVG）
   ```

5. 跑 `bash design-system/covers/generate-png.sh {slug}` 產 PNG（headless Chrome）
   - 全站批次：`bash design-system/covers/generate-png.sh`
6. 多語言：每個 locale 各自一份 cover.svg（共用符號，文字各自在地化）

## 零件清單

### Gradients（永遠先放）

- `#grad-indigo` — 深靛主色（品牌主）
- `#grad-amber` — 琥珀強調（品牌輔）
- `#grad-paper` — 背景紙感（淡薰衣草）
- `#grad-screen` — 螢幕發光

### Characters（角色）

| ID | 用途 | 視覺 |
| -- | -- | -- |
| `#person-focused` | 專注工作的人 | 坐姿，筆電前 |
| `#person-anxious` | 困惑/緊張 | 頭上「?」或「!」泡泡 |
| `#person-approaching` | 走過來 / 遠端詢問 | 站姿，手持手機 |

### Props（道具）

| ID | 用途 |
| -- | -- |
| `#folder-shared` | 中央大資料夾，可放檔名卡 |
| `#file-card` | 單張檔名卡（文字可換） |
| `#file-chaos` | 檔名亂飛的氛圍群組 |
| `#lightning` | 琥珀閃電（logo 呼應 / 警示） |
| `#speech-bubble` | 對話泡 |
| `#thought-bubble` | 思考泡 |

### Brand

- `#keeply-lockup` — logo + wordmark（右下角固定位）
- `#eyebrow-label` — 頂部分類標籤（如「THE HIDDEN COST」）

## 食譜（recipes）

### 「共享/協作衝突」類文章

主角：`#folder-shared` 置中
配角：2-3 個 character 圍繞，連線到 folder
範例：`examples/shared-folder-chaos.svg`

### 「單人決策困境」類文章

主角：一個 `#person-anxious` 置中
配角：多個檔案卡環繞、一個 `#lightning`
範例：`examples/solo-dilemma.svg`

### 「成本/數字」類文章

主角：巨型數字（text 元素）+ 一個 character
配角：細節道具在角落
範例：`examples/cost-hero.svg`

### 「教學/流程」類文章

主角：橫向排列 3 個 character，各做不同動作
配角：箭頭連接、step 標籤
範例：`examples/workflow-steps.svg`

## 色票（從 logo 萃取）

| 名稱 | Hex | 用途 |
| -- | -- | -- |
| indigo-900 | `#312E81` | 深色文字 |
| indigo-700 | `#4338CA` | 品牌主 |
| indigo-600 | `#4F46E5` | 品牌次 |
| indigo-400 | `#9C98FF` | 淺色強調 |
| lavender-100 | `#E4E3FF` | 背景 |
| amber-500 | `#F59E0B` | 強調 / 警示 |
| amber-400 | `#FFB300` | 強調亮 |

## 畫布規格

所有封面：**1600 × 900**（16:9，Hugo stack theme 卡片也用同比例）。

## 未來擴充

每設計一篇新文章、新增一個從未出現過的視覺元素，就把它加進 `symbols.svg` 並更新本檔的零件清單。
三個月後應該會有 ~20 個零件，足以覆蓋大部分文章類型。
