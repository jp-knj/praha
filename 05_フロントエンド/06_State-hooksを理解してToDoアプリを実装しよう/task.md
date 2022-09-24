# State hooks を理科してToDoアプリを実装しよう

[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recNu9gJ8m0XSbFRM?blocks=hide)

## 課題１
React公式サイトを読もう
Q.フックを使うことでどのようなメリットがあるのでしょうか？
`state` を持ったロジックをコンポーネントから抽出して、単独でテストしたり、コンポーネントの階層構造を変えずに、また再利用することができます。
フックは関連する機能に基づいて、１つのコンポーネントを複数の小さな関数に分割することができます。なので、`state管理`を予測しやすくするため、必要に応じて`reducer`を使って管理するようにできる。

Q.外部フックを1つ紹介しよう
`useFetch`について
ネイティブの`Fetch API`を使用してAPI上のデータを取得することを目的とした`React Hook`を紹介します。
ステートロジックを分離するために`reducer`を使用し、関数型スタイルによるテストを簡素化。
受信したデータは `useRef` によってアプリケーションに保存（キャッシュ）されますが、データを持続させるために `LocalStorage`を使用することができます。
取得は、コンポーネントがマウントされたときと `url` が変更されたときに実行されます。`url` が未定義の場合、あるいはデータが回収される前にコンポーネントがアンマウントされた場合、`fetch`は呼び出されません。
このフックはまた、リクエストのヘッダに認可トークンを渡すことができるように、リクエストの設定を第二引数として受け取ります。しかし、後者は変更の際に再レンダリングを引き起こさないので、 `urlパラメータ`を通して動的にリクエストを変更してください。

より深く理解したい場合は、[この記事](https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/)を読むと良いかもしれません。
あと、SSRで使用する場合は、`window.fetch.polyfill`を使用することを検討してください。
高度な使い方や最適化については、`useSWR`や`useQuery`、`Redux Toolkit`を使っている場合は`RTK Query`など、より強力な他のフックを参照してください。
[usehooks-ts/useFetchについて](https://usehooks-ts.com/react-hook/use-fetch)

## 課題2
[Todoアプリ](https://github.com/knj-labo/learn_cypress)

## 課題3
Container/Presentationalの概念について
Q.1 どのようなメリットがあるでしょうか？
関心事の分離ができる。Container/Presentationalデザインパターンでは、アプリケーションのロジックからビューを区別することができる
- Presentationalコンポーネント : データをユーザにどのように見せるかを考える/UIを担当する純粋な関数である
- Containerコンポーネント : どのようなデータがユーザに表示されるかを管理する/アプリケーションの状態やデータを担当する
このため、関心事の分離を実現することができます。 `Presentationalコンポーネント`は、データを変更することなく表示するだけなので、再利用が容易です。アプリケーション全体を通して、異なる目的のためにを再利用することができます。
`Container/Presentationalパターン`は、関心事の分離を促進します。`Presentationalコンポーネント`はUIを担当する純粋な関数であるのに対し、`Containerコンポーネント`はアプリケーションの状態やデータを担当する。このため、関心事の分離を容易に実現することができます。
`Presentationalコンポーネント`は、データを変更することなく表示するだけなので、再利用が容易です。アプリケーション全体を通して、異なる目的のために`Presentionalコンポーネント`を再利用することができます。

`Presentationalコンポーネント`はアプリケーションロジックを変更しないので、Reactの実装に知識がない人、例えばデザイナーでも簡単に`Presentionalコンポーネント`の外観を変更することができます。もし、`Presentationalコンポーネント`がアプリケーションの多くの部分で再利用された場合、その変更はアプリケーション全体で一貫したものにすることができます。

`Presentationalコンポーネント`は、通常、純粋な関数であるため、テストは簡単です。データストアをモックしなくても、どのデータを渡すかによって、コンポーネントが何をレンダリングするかを知ることができます。
デメリット: Container/Presentationalパターンを使わなくても、また、ステートレスな機能コンポーネントをクラスコンポーネントに書き換えなくても、同じ結果を得ることができるようになるのです。
React Hooksを使ってもContainer/Presentationalパターンを使うことはできますが、このパターンは小規模なアプリケーションでは過剰になりがちです。

Q.3 controlled/uncontrolledに区別するメリットについて
まず、Reactの公式ドキュメントによると`Controlled Components`の使用を推奨しています。

### Controlled Components について
`Controlled Components`は　Reactの状態を中継して入力が`controlled`コンポーネントです。入力フォーム要素の`onChange`を使用して入力の状態を更新し、新しい値を`value`に設定する。入力毎に React の状態が更新されるため再レンダリングが発生します。入力値を直接`controll`することが可能です。

### Uncontrolled Components について
`React Hook Form` などは`Uncontrolled Components`です。
`Controlled Components` は React によって入力値を`controll`しますが、`Uncontrolled Components` は入力値を DOM 自身（ブラウザ）が`controll`します。
入力毎に React の状態が更新されないため再レンダリングが発生しません。 ネイティブ実装（に近い）です。

Uncontrolled Componentsのメリット : 
- コードの記述量が少ない
  - `onChange` を使用した入力フォーム要素に値を設定するための定型コードが不要となる
- パフォーマンスが向上する 
  - 入力する度に再レンダリングが発生しない
  Controlled Components の場合、入力毎に再レンダリングが発生するため、フォームの状態がコンポーネントツリーの上位にある場合にパフォーマンスの問題を引き起こすことがある
- ネイティブ実装に近づくため移植性が高い

[controlled componentについて](https://ja.reactjs.org/docs/uncontrolled-components.html)


## 課題4
- useStateに関するクイズ
  - Q1.useState を呼ぶと何が起きるのか？
  - Q2.`state変数`は1つにすべきですか、複数使うべきですか
    - `useSate()`を1回だけ呼んで、1つのオブジェクト内にすべての`state`を入れたくなるかもしれません
  - Q3.useStateとuseReducerはどのような違いがあるでしょうか