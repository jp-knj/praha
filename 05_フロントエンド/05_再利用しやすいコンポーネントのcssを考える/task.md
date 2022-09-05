# 再利用しやすいコンポーネントのcssを考える
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recYV2Lg2Fl0QIN4s?blocks=hide)

## 課題１
Q.なぜこのような`css`の書き方をすると再利用しづらいコンポーネントになってしまうのでしょうか？
```css
.reusable-button {
    color: red;
    margin-top: 50px;
}

.App {
    font-family: sans-serif;
    text-align: center;
}
```
```javascript
function ReusableButton() {
  return <button className="reusable-button">click me!</button>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ReusableButton />
    </div>
  );
}
```
この宣言では、文脈を考慮できてらず、margin設定が適切なものになるかどうかは場合による。
親要素に`padding`を設定している場合、その内側では重複した`margin`と親要素の`padding`が足された空白が発生する。

より再利用しやすいようcssを書き直した。
```css
.reusable-button {
  color: red;
  margin-top: 50px;
}
.App {
  font-family: sans-serif;
  text-align: center;
}
.App > :last-child{
  margin-top: 50px;
}
```
```javascript
function ReusableButton() {
  return <button className="reusable-button">click me!</button>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ReusableButton />
    </div>
  );
}
```
## 課題2
なぜこのようなcssの書き方をすると再利用しづらいコンポーネントになってしまうのでしょうか？  
[問題のあるCSSの書き方](https://codesandbox.io/s/great-margulis-ir96j?file=/src/App.js)

要素やコンポーネントはそれぞれ独立したものと考える。設計の時点では、周囲が別のコンテンツにとりかこまれるかどうかも、そのコンテンツがどんな性質なのかも決まってないため、親と子の関係性を定めたくはない。

より再利用しやすいようcssを書き直した。
```css
.with-sidebar {
 display: flex;
 flex-wrap: wrap;
 // sidebar と　mainの隙間幅（ガター）
 gap: var(--gutter, var(--s1))
}
.with-sidebar > :first-child {
 // サイドバーがサイドバー足りうる幅
 flex-basis: 20rem;
 flex-grow: 1;   
}
.with-sidebar > :last-child {
 // 0から伸長
 flex-basis: 0;
 flex-grow: 999;
 //　要素の幅が等しくなったときに折り返す
 min-width: 50%;   
}
```

```html
<div class="with-sidebar">
  <div>サイドバー</div>
  <div>サイドバーじゃない</div>
</div>
```

## 課題3
このコンポーネントのコンポーネント設計に潜んでいる問題を一つ教えてください。なぜこのような書き方をすると再利用しづらいコンポーネントになってしまうのでしょうか？
[問題のあるHTML構造](https://codesandbox.io/s/epic-nash-2vbw4?file=/src/App.js)  
再利用しづらい理由は
- 親要素も呼び出される子要素（li）も、そのコンポーネントがどのように作られているかを気にする必要があること。
- 呼び出される親要素が条件に合っていなければ使いまわせないこと。（今回の場合は、`menu`,`ol`,`ul`に含まれていなければならない）
[liについて](https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element)

## 課題4
なぜこのような書き方をすると再利用しづらいコンポーネントになってしまうのでしょうか？  
[問題のあるpropsの渡し方](https://codesandbox.io/s/aged-glade-6grnuk)

`CustomBlueButton`は`CustomButton`の`UI`を継承しているため、`CustomButton`の影響を受ける。

以下のようなpropsにすると、さらに汎用的なコンポーネントになる。
```javascript
borderBottom: 'mainColor' | 'subColor' | 'none'
color: 'red' | 'blue' | 'yellow'
```