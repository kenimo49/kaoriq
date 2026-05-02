# CLAUDE.md — kaoriq

## このリポジトリについて

kaoriq.com のソースコード。性格診断 × 59,000本香水DB × Shopifyドロップシッピングによるデータ駆動型フレグランスEC。Astro v6 + Tailwind v4の静的サイトで、Phase B以降にShopify Storefront APIを同一ドメインに追加する。

サイト: https://kaoriq.com/

## タスク別ナビゲーション

### 記事を書くとき

1. フロントマター仕様 → `src/content.config.ts`
2. 既存記事の例 → `src/content/blog/en/` または `src/content/blog/ja/`
3. EN記事は `src/content/blog/en/slug.md`、JA記事は `src/content/blog/ja/slug.md` に配置
4. 記事の一人称は「私」（kenimo49名義のテキスト共通ルール）
5. **category フィールド必須**（`guide` / `science` / `story`）
   - `guide`: 選び方ガイド。比較表・箇条書き中心。友達に相談された語り口
   - `science`: 香りの科学。研究・データベース。専門用語には平易な説明を添える
   - `story`: 香り文化・歴史・調香師の話。エッセイ・雑誌記事寄り
6. マーケティング文言の注意 → [docs/strategy.md](docs/strategy.md) の「マーケティング上の注意」セクション
   - 「お部屋用」「空間用」→ OK（雑貨）
   - 「肌に付ける」「ボディに」→ NG（化粧品扱いになる）

### デザインを変更するとき

1. カラーパレット（CSS変数） → `src/layouts/BaseLayout.astro` の `:root` / `[data-theme]`
2. フォント設定 → 同ファイルの `<link>` と `body` / `h1,h2,h3` のfont-family
3. ブログ記事のスタイル → `src/layouts/BlogLayout.astro` の `.prose`
4. ナビゲーション → `src/components/Nav.astro`
5. デザイン方針・参考サイト・配色理由 → [docs/design-references.md](docs/design-references.md)

### ページを追加するとき

- EN: `src/pages/` 直下に `.astro` ファイル作成
- JA: `src/pages/ja/` 以下に配置
- レイアウトは `BaseLayout` を使い、`Nav` コンポーネントを含める
- hreflang: EN/JA の対になるページを作り、`<link rel="alternate" hreflang>` を設定

### Shopify連携を実装するとき（Phase B）

1. 戦略全体像 → [docs/strategy.md](docs/strategy.md)
2. アーキテクチャ → 同ファイルの「自律運用アーキテクチャ」セクション
3. Shopify Storefront APIで商品データ取得 → Astroページでレンダリング
4. Admin APIは harness-ops から商品登録・注文管理に使用
5. 特商法表記・プライバシーポリシーのページ追加が必要

### デプロイ・インフラを触るとき

- GitHub Actions → `.github/workflows/deploy.yml`
- ドメイン: kaoriq.com（お名前.com）、DNS → GitHub Pages
- GA4: `G-JQT8YQS2GL`（BaseLayout.astro に埋め込み済み）
- 環境変数 → `.env`（gitignore済み）、`.env.sample` が参照テンプレート

## ディレクトリ構成

| パス | 役割 |
|------|------|
| `src/content/blog/{en,ja}/` | ブログ記事（Markdown、Content Collections） |
| `src/layouts/` | BaseLayout（全ページ共通）、BlogLayout（記事用） |
| `src/components/` | Nav（ナビゲーション） |
| `src/pages/` | ENページ群 |
| `src/pages/ja/` | JAページ群 |
| `public/` | 静的ファイル（favicon、llms.txt、CNAME） |
| `docs/` | 戦略・デザイン等のドキュメント |

## 技術スタック

- Astro v6 + Tailwind CSS v4（`@tailwindcss/vite`）
- Content Collections: glob loader + Zod schema（`src/content.config.ts`）
- ホスティング: GitHub Pages（`deploy.yml` で自動デプロイ）
- SEO: sitemap自動生成（`@astrojs/sitemap`）、RSS（`@astrojs/rss`）、JSON-LD、hreflang
- LLMO: `public/llms.txt`

## ドキュメント

| ドキュメント | 内容 | いつ読むか |
|-------------|------|----------|
| [docs/strategy.md](docs/strategy.md) | ビジネスモデル、法務、自律運用設計、商品選定基準 | 戦略判断・商品登録・法務確認時 |
| [docs/design-references.md](docs/design-references.md) | カラーパレット、参考サイト、フォント選定理由 | デザイン変更・新ページ追加時 |
| [public/llms.txt](public/llms.txt) | LLM向けサイト説明 | LLMO最適化の更新時 |

## コミットメッセージ規約

```
カテゴリ: 変更の要約

例:
  add: GA4 tracking (G-JQT8YQS2GL)
  design: warm fragrance palette + serif headings
  docs: comprehensive strategy document
  content: add article on woody fragrance families
```

## 関連リポジトリ

| リポジトリ | 連携内容 |
|-----------|---------|
| `iris-hub` | 戦略Issue (#94)、活動ログ |
| `sns-operations` | harness-ops、fragrance-cycle skill（予定） |
| `persona-manager` | 性格診断エンジン（推薦連携予定） |
| `context-forge` | 香り関連のナレッジDB登録 |
