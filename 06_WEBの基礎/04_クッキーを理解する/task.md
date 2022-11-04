# クッキーを理解する
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recK3c8nSvVp6OaYY?blocks=hide)

## 課題１
- クッキーとはなんでしょうか？
  - ウェブサイトの情報をブラウザに保存する仕組みのこと
    - 適切に名付けられた Set-Cookie ヘッダーをサーバはレスポンスで送信することによって Cookie を設定します。


- www.hoge.comで発行されたクッキーは、www.fuga.comにも送信されるでしょうか？
  - その理由を説明してください
    - 送信はできない
      - `www.`(サブドメイン)は一致しても `hoge.com`,`fuga.com`(ドメイン)は異なっているから
      - 送信時にDomain属性の働きがあるため。Domain属性は「設定された値と送信先のサーバのドメインがマッチするときにだけCookieを送信できる」役割を持っている。
      - Domain属性が存在しないと、悪意のあるサーバから攻撃対象のサーバに送信されるCookieを自由に設定できると、セッション固定攻撃の要因になるため。

[RFC](https://www.rfc-editor.org/rfc/rfc6265#section-5.1.3)

- hoge.com:8080のクッキーはhoge.com:9090にも送信されるでしょうか？
  - 送信はできる
    - > Cookies do not provide isolation by port.
    - ポート番号は分離されないため

[RFC](https://www.rfc-editor.org/rfc/rfc6265#section-8.5)

- www.hoge.comで発行されたクッキーは、www.api.hoge.comにも送信されるでしょうか？
  - 送信はできる
  - 先頭の`%x2E`（ "." ） は、 在っても無視されることがあるため

[RFC](https://www.rfc-editor.org/rfc/rfc6265#section-4.1.2.3)

- クッキーにDomain="hoge.com"を指定した場合、api.hoge.comにもクッキーは送信されるでしょうか？
  - 理由を説明してください
  - Domainが指定された場合、サブドメインは常に含まれるため
    - 具体例
    - `Domain=mozilla.org` を設定すると、`developer.mozilla.org` のようなサブドメインも含まれる。

[MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies#cookie_%E3%81%AE%E9%80%81%E4%BF%A1%E5%85%88%E3%81%AE%E5%AE%9A%E7%BE%A9)

- ブラウザで実行されるJavaScriptは場合によってはクッキーの値を取得できます。JavaScriptからクッキーの値が取得されることを防ぐことは可能でしょうか？
  - どうすれば良いのでしょうか？
  - `HTTPOnly`属性を追加する
    - JavaScript の Document.cookie API にはアクセスできません。サーバーに送信されるだけです。例えば、サーバー側のセッションを持続させる Cookie は JavaScript が利用する必要はない。
    - この予防策は、クロスサイトスクリプティング (XSS) 攻撃を緩和するのに役立つ

- HTTPS（暗号化）通信の時だけクッキーを送信することは可能でしょうか？
  - どうすれば良いのでしょうか？
  - `Secure`属性を追加する
    - HTTPS プロトコル上の暗号化されたリクエストでのみサーバーに送信され、安全でない HTTP では決して送信されないため、中間者攻撃者が簡単にアクセスすることはできません。