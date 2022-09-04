# 作ったページをレスポンシブ対応しよう
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/reckDuAqtxnTPxMUF?blocks=hide)

## 課題1

## 課題2
### レスポンシブデザインの対応するメリット
- URLが1つなので、ユーザーによるコンテンツの共有やリンクが簡単になる。
- 同じコンテンツのページをくつも維持管理する手間が省ける。
- モバイルサイトで利用できないような（動画など）誤りを防げる
- ユーザをでデバイスごとに最適化したページ二里ファイレクトする必要がないため、読み込み時間を短縮できる。
**参考**
[モバイルサイトでよくある誤り](https://developers.google.com/search/mobile-sites/mobile-seo/common-mistakes)
#### PC/SPを分別するためにユーザーのデバイス種別を用いる
- メリット
  - ブラウザがPCかSPかを検知し、そのデバイス用に最適化されたHTMLとCSSを同じURLで送信する方法です。
ダイナミックサーブのサイトは、（個別のURLのものと同様に）最適化することができ、レスポンシブサイトと同様に、単一のURLのセットでコンテンツを提供します。
- デメリット
  - 開発と保守が複雑になること。

#### cssを使用して、メディアクエリに応じてレスポンシブ対応
- メリット
  - 開発と保守が容易になること。 
- デメリット 
  - SP端末 は、PC では表示されない不要なコンテンツを読み込む必要があり、PCでは表示されるはずのコンテンツが非表示になります。そのため、レスポンシブサイトは、特定の種類の端末に最適化されていないため、個別のURLのモバイルサイトより遅くなる可能性が十分にあります
#### `window.matchMedia`を使用するメリットとは
- `window.matchMedia`なら breakpoint が切り替わると一度だけ処理が実行されパフォーマンスが向上
  - `window.resize`の場合はサイズが変更毎に実行される

[MediaQueryList](https://developer.mozilla.org/ja/docs/Web/API/MediaQueryList)
#### PC/SPを分別するためにURLを分けるメリットとは
※ サイトの設定として別々のURLを使用することは推奨しない。(実装と保守が困難なため)
実装方法として
- 2つの URL の関係を `<link>タグ`、`rel="canonical"要素`、`rel="alternate"要素` で伝える。
- ユーザーエージェント文字列を検出して正しくリダイレクト。

- 別々にURLを分けるメリット
  - 各デバイス固有のデザインを実装できること
  - サイト表示速度が早いこと

- 別々にURLを分けるデメリット
  - リダイレクト設定に工数がかかる
  - サイト更新時に双方に更新が必要である
  - 検索エンジンにPC/SPサイトと重複したコンテンツだと評価されないように伝える必要がある。
[別々のURL](https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls)