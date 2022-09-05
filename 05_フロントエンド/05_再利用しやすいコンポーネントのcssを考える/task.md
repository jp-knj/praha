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

このコンポーネントをより再利用しやすいようcssを書き直してみてください
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