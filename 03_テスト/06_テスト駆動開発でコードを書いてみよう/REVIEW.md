# REVIEW
> tsで実装されているのでメソッドに文字列などを渡された場合を考慮しなくて良いのが良いと思いました！

> 反面、型で防御できない「引数が空の配列の場合」や「引数が一つの場合」に対するテストは書いたほうが良いのかな？と感じました。

確かに！
話が変わるんですけど、こういう便利関数を作成していた最中だったので、興味のある意見だと感じました。
https://github.com/knj-labo/assert-util-type/blob/main/src/assert-filled-array.ts

> 関数の中で使用する定数をconstant.tsとしてファイルに切り出す実装は自分もteam2の他の方もやっていなかったので特徴的だと思いました！
> 関数で使用する定数は関数と同じファイルに記述されているほうが他のファイルを参照しにいかなくて嬉しいのかな、と思ったのですが他の関数でも共通で使用することを想定されての実装なのでしょうか？

意見を聞いて、感じたことを話すと
小〜中規模、少人数なら関数ごとに文字列定数を持ってしまうのが良さそうです。（特に今回の場合）
共通で使用する意図があったというよりも、エラーメッセージやバリデーションメッセージ、i18n等は一覧としてファイルに共通化しておくプロジェクトに参加していたので、その名残がここにでているんだと思います。
