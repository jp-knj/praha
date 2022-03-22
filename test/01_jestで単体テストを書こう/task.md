# jestで単体テストを書こう

## 課題１
### 公式ドキュメントを読もう

<details>
    <summary>assertionとは？</summary>
    テスト結果が期待値と同じであるのかの真偽判定を行い、意図と異なる値が検出された場合、テストを失敗させる
</details>

<details>
    <summary>code coverageとは？</summary>
    テスト対象となるロジック全体の中で、テストが行われた部分が占める割合
</details>

<details>
    <summary>ライブラリとは？</summary>
**JavaScriptのテストツールには種類がある**
- テストランナー
- テストフレームワーク
- アサーションライブラリ
- DOMテスティングライブラリ
- E2Eライブラリ
</details>

<details>
    <summary>モックとは？</summary>
テスト対象が依存コンポーネントを呼び出した時に取得できる値を用意し、さらに呼び出した時に与えた値を記録(スタブとモックの機能を保持)

テスト対象が既に実装された依存コンポーネントを呼び出した値や回数を検証するテスト

自作した`MockFn`
```javascript
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}
```
</details>

<details>
    <summary>モンキーパッチとは？</summary>
    システムソフトウェアを補完するために、プログラムをその時その場の実行範囲内で拡張または修正するというテクニックである。モンキーパッチの影響はその時その場のプロセス（プログラムの実行インスタンス）だけに限定されて、プログラム本体には及ばない

**参考文献**
- [モンキーパンチングについて](https://bit.ly/3pibWQ4)
</details>

<details>
    <summary>spyとは？</summary>
テスト対象が依存コンポーネントを呼び出したときに取得できる値を用意し、さらに呼び出したときに与えた値を記録する。（スタブとモックの機能を持つ）

テスト対象が既に実装された依存コンポーネントを呼び出した値や回数を検証するテスト
</details>


<details>
    <summary>stubとは？</summary>
テスト対象が依存コンポーネントを呼び出した時に取得できる値を用意。

依存コンポーネントから取得できる値が変化した時、テスト対象の挙動がどう変化する確認するテスト。
</details>

<details>
    <summary>test doubleとは？</summary>
テストダブルとは、テスト実行時に、テスト対象が依存しているコンポーネントと置換

- スタブ
- モック
- スパイ　など
</details>

<details>
    <summary>describeとは？</summary>
describeは、いくつかの関連するテストをまとめたブロックを作成  
複数のテストをdescribeにまとめることで、テスト結果がグループごとに出力  
テストの数が増えてくると、describeでテストをグループに分ける事で管理が容易
</details>

## 課題２
[実装内容](https://github.com/jp-knj/praha/tree/main/test/01_jest%E3%81%A7%E5%8D%98%E4%BD%93%E3%83%86%E3%82%B9%E3%83%88%E3%82%92%E6%9B%B8%E3%81%93%E3%81%86/implementation)

## 課題３
### カバレッジ100％のテストを実装できなかった理由
密結合な依存が発生していたため。

### DIとは？
依存性注入/Dependency Injectionのこと。.  
デザインパターンの一つで、オブジェクトなどの間に生じる依存関係をオブジェクト内のコードに直接記述せず、外部から何らかの形で与えるようにする手法。

参考文献
- [DIについて](https://e-words.jp/w/%E4%BE%9D%E5%AD%98%E6%80%A7%E6%B3%A8%E5%85%A5.html#:~:text=%E4%BE%9D%E5%AD%98%E6%80%A7%E6%B3%A8%E5%85%A5%20%E3%80%90DI%E3%80%91%20Dependency,%E4%B8%8E%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B%E6%89%8B%E6%B3%95%E3%80%82)
### モジュール同士の結合度はどうなるのか？
結合度は低くなる。
- オブジェクトやクラス間は疎結合
- 再利用性が高くなる
- 単体テストを書きやすくなる

### Property Based Testingについて
#### Property Based Testingとは
半自動で値を生成し、それに対してテストを行う手法のこと。
##### ３つのベネフィット
- 全ての可能な入力の範囲を網羅する
    - 理論的に可能な限りの入力を生成することができ、文字列や整数など、テスト対象のシステムが必要とするあらゆる型をカバーすることができる。
- 失敗は小さく要約する
    - 文字列中にある文字が存在することが失敗の条件であれば、その文字だけを持つ一文字の文字列を返すべきである。
- 再現性が高い
    - プロパティテストを実行するたびに、同じデータセットでテストを再実行できるようにシードが生成される。
    - 実行に失敗した場合、その実行を完全に再現できるように、失敗したケースとシードの両方がフレームワークに出力されます。

これは、定型的なテストを減らすために非常に効率的であることを証明するために
追加のテストのレイヤーを提供する

参考文献
[Property based testingについて](https://medium.com/criteo-engineering/introduction-to-property-based-testing-f5236229d237)
[ハンズオンProperty based testing](https://github.com/dubzzz/fast-check/blob/main/documentation/HandsOnPropertyBased.md)

## 課題４
[課題内容](https://github.com/jp-knj/praha/blob/main/test/01_jest%E3%81%A7%E5%8D%98%E4%BD%93%E3%83%86%E3%82%B9%E3%83%88%E3%82%92%E6%9B%B8%E3%81%93%E3%81%86/implementation/error-middleware.ts)

## 任意課題
[Type Challengeの回答](https://zenn.dev/ignorant_kenji/scraps/52f2fc03f42e6b)