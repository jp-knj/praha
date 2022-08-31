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
#### 構文の違い
- 関数コンポーネントはJSXを返すシンプルなJavaScript関数
```typescript
import React from "react";

function FunctionalComponent() {
 return <h1>Hello, world</h1>;
}
```

- `React.Component`を拡張するJavaScript class
```typescript
import React, { Component } from "react";

class ClassComponent extends Component {
 render() {
   return <h1>Hello, world</h1>;
 }
}
```

#### propsの受け渡し
```typescript
// 関数コンポーネント
const FunctionalComponent = (props) => {
 return <h1>Hello, {props.name}</h1>;
};
```

```typescript
// クラスコンポーネント 
class ClassComponent extends React.Component {
  render() {
    const { name } = this.props;
    return <h1>Hello, { name }</h1>;
  }
}
```
関数コンポーネントは引数として`props`を渡す。
クラスは`this`を使用してpropsを参照する必要がある。

#### stateの処理
stateful関数コンポーネントで書ける。(現在の状態を表すデータなどを保持しており、その内容を処理に反映させる)
```typescript
const FunctionalComponent = () => {
 const [count, setCount] = React.useState(0);

 return (
   <div>
     <p>count: {count}</p>
     <button onClick={() => setCount(count + 1)}>Click</button>
   </div>
 );
};
```

クラスコンポーネントのstateを処理する場合、概念は同じですが、方法が少し異なります。まず、`React.Componentコンストラクタ`の重要性を理解する必要があります。

基本的に、コンストラクタを実装して`super(props)`の呼び出しを実行しないと、使用したいすべての`state変数`を定義できません。このため、まずコンストラクタを定義しましょう。コンストラクタ内では、`stateキー`と初期値を使用してstateオブジェクトを作成。JSX内て、`this.state.count`を使用してコンストラクタで定義した`stateキー`の値にアクセスし、カウントを表示。
```typescript
class ClassComponent extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     count: 0
   };
 }

 render() {
   return (
     <div>
       <p>count: {this.state.count} times</p>
       <button onClick={() => this.setState({ count: this.state.count + 1 })}>
         Click
       </button>
     </div>
   );
 }
```

総じて、関数コンポーネントの記述は短くシンプル。
そのため、開発や可読性、テストがしやすくなります。クラスコンポーネントでは`this`が多用されるため混乱が生じやすくなります。

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
関わるメンバー全員で認識合わせや基準を明確にできないこと。Atomic Designの知識を有していても、コンポーネントの各ディレクトリの役割を明文化するのには長い期間と労力が必要になる。
ビジュアルデザイナーとの連携を踏まえた実装や概念や設計が破綻しないように部品を考える必要がある

### Atomic Designに代わるディレクトリ構造を考えてみてください
シンプルで保守しやすい方法でアプリケーションするために、機能を有するコードを `featuresフォルダ`内に保持する。
`featuresフォルダ`には、その機能に特化したコードを格納。こうすることで、単一な機能に保ち、その宣言が共有のものと混在しないようになる。
これは、多くのファイルを含むフラットなフォルダー構造よりもはるかに保守しやすくなります。

```shell
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
+-- components        # shared components used across the entire application
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app
+-- features          # feature based modules
+-- hooks             # shared hooks used across the entire application
+-- lib               # re-exporting different libraries preconfigured for the application
+-- providers         # all of the application providers
+-- routes            # routes configuration
+-- stores            # global state stores
+-- test              # test utilities and mock server
+-- types             # base types used across the application
+-- utils             # shared utility functions
```

[project structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)