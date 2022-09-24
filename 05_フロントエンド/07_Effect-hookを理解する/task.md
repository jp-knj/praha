# Effect hook を理解する
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recHS0bzOC3fcEgGe?blocks=hide)

## 課題1
- React公式ドキュメント
Q1.`useEffect`の中で`cleanup処理`を返すことがあります。なぜ、このような処理が必要なのでしょうか？

メモリリークを発生しないように`cleanup`が必要になるため。
`useEffect`の特徴として、副作用の処理と`clearnup処理`を一緒にかけるように設計されています。副作用が関数を返した場合に React は cleanup のタイミングで実行されます。

React は具体的には副作用のクリーンアップをいつ発生させるのでしょうか?
React はコンポーネントがアンマウントされるときにクリーンアップを実行します。
しかし、副作用は 1 回だけでなく毎回のレンダー時に実行されます。このため React は、ひとつ前のレンダーによる副作用を、次回の副作用を実行する前にもクリーンアップします。そしてこれがパフォーマンスの問題を引き起こしている場合にどのようにしてこの挙動を止めるのでしょうか

再レンダー間で特定の値が変わっていない場合には副作用の適用をスキップするよう、React に伝えることができるのです。そのためには、useEffect のオプションの第 2 引数として配列を渡してください。
```typescript
useEffect(() => {
document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```
第 2 引数として [count] を渡しています。もし `count` が `5` で、次回のコンポーネントのレンダー時にも `count` がまだ `5` であった場合、React は前回のレンダー時に覚えておいた [5] と今回のレンダーの [5] とを比較します。
配列内のすべての要素が同一 (5 === 5) ですので、React は副作用をスキップします。
スキップすることで最適化が行われているのです。
再レンダー時に count が 6 に変更されている場合、前回レンダー時に覚えておいた [5] と今回のレンダー時の [6] という配列とを比較します。
今回は 5 !== 6 ですので React は副作用を再適用します。
配列内に複数の要素がある場合、React は配列内の要素のうちひとつでも変わっている場合に副作用を再実行します。

クリーンアップフェーズがある副作用でも同様に動作します
```typescript
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // props.friend.id が変更された時のみ、re-subscribe される
```

Q2.useEffectの第２引数に何も指定しなかった場合
useEffectのコールバック関数はコンポーネントがレンダリングされた後に実行されます。コールバック関数内でstateを更新しているため、実行直後にまたコンポーネントがレンダリングされ、useEffectのコールバック関数が実行され...と無限ループになります。
```typescript jsx
import React, { useEffect, useState } from "react";

export const Example: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  });

  return (
    <>
      <h3>click count : {count}</h3>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
};
```
Q2.useEffectの第２引数に空の配列[]を指定した場合
副作用と`clearnup`を 1 度だけ（マウント時とアンマウント時にのみ）実行します

## 課題2
[Code Sandbox](https://codesandbox.io/s/use-effect-demo-forked-witf6s?file=/src/App.js)

## 課題3
[Code Sandbox](https://codesandbox.io/s/use-effect-demo-forked-witf6s?file=/src/fetch-component.js)

## 課題4

Q1. useEffect はデータフェッチ関数ではありません、代わりに何を使えば良いでしょうか？
Q2. useEffect と useLayout の違いは何でしょうか？
Q3. マウント処理とアンマウント処理の繰り返し処理のことを何と言うでしょうか？
