# 適切にコンポーネントを分割して1ページ作ってみよう
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/reca7aFOz5kp6cPQp?blocks=hide)

## 課題1
### Atomic Design とはなんでしょうか
Atomic Design はアメリカの Web デザイナーである Brad Frost 氏が提唱したデザインシステムの設計方法。Atomic Designの考え方は、CSSやJavaScriptなど、Webに限定された方法ではなく、UIをどう構築すればよいかということにフォーカスしたものであると著では述べられています。化学と類似した思想を持っており、UIを分解して考え、他の画面でも共通で使えるAtom、Moleculeをどう設計するか、細部を作りながら全体を俯瞰し、また細部が適切かどうか、具体的にコンテンツを入れながら考えるというのが、Atomic DesignのUIデザイン方法論。

**参考**  
[Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
### Atomic Design の文脈における以下の用語を説明する
#### Atoms
- それ以上分割できないコンポーネントを定義する
- フォントサイズが違う、とかでも異なるコンポーネントに分割する
- 外部から注入する値は、テキストや画像のURL、リンク先のURLや、atomsでは決められないレイアウト上のサイズ程度にする

#### Molecules
- 幾つかのAtomsを組み合わせたコンポーネント
- 単体で何らかの意味のあるアクションを起こせるコンポーネントを定義する
  - 例: input(type:text)と、button(value:search) で検索窓
  - 例: label、textarea、buttonで入力フォーム
- なるべく単純に保つ

#### Organisms
- 幾つかのAtoms、Molecules、Organismsを組み合わせたコンポーネント
- 画面上のあるエリアを構成する要素を定義する
  - 例: ヘッダー
  - 例: フッター
  - 例: サイドバー
  - 例: 〜〜リスト

#### Templates
- 幾つかのMolecules、Organismsを組み合わせたコンポーネント
- 画面全体を定義する
- データは入っていないが、それ以外の要素は全て含まれており、ワイヤーフレームとして成立する

#### Pages
- Templatesにデータを注入したもの

### React における関数コンポーネントとクラスコンポーネントの相違を説明する
NOT YET

## 課題2
### 「position: absoluteは絶対に使わないように」と言われました。なぜでしょうか？
> positioned layout, designed for very explicit positioning without much regard for other elements in the document

他の要素を考慮せず、明確な position を指定できる。使用できる状態が珍しいため、再利用性が著しく低い。

**参考**  
[flexbox](https://www.w3.org/TR/css-flexbox-1/#intro)
### 「可能な限りflexboxを使うように」とも指示されたので、基本的にレイアウトはflexboxで作ってみましょう
> In return it gains simple and powerful tools for distributing space and aligning content in ways that web apps and complex web pages often need. The contents of a flex container

Webアプリケーションや複雑なWebページが必要とする、スペース管理やコンテンツの配置を行うための simple で便利な layout mode なため。

**参考**  
[css-flexbox](https://www.w3.org/TR/css-flexbox-1/#overvie)
## 課題3
### より大きく複雑なサービスの開発にatomic designを取り入れた際に起きうる問題点をいくつか挙げてください

### アトミックデザインに代わるディレクトリ構造を考えてみてください