# CORS について理解する 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/rechlwfZXjs0yQPX7?blocks=hide)

## 課題１
以下の単語を使ってCORSの仕組みを説明してください
- preflight request
- simple request
- access-control-allow-origin

CORSはあるHTTPヘッダーを使用してクライアントとサーバのやりとりを行います。
- `Origin`
- `Access-Controll-Request-http://example.com`

**クライアントで CORS の許可がないとき**
クライアントのサイトオリジンを `http://example.com` 
サーバのサイトオリジンを`http://api.example.com`とする。

1. クライアントは、クライアントのサイトオリジンへのリクエストを送り、リソースを取得するための JSファイル をダウンロードする
2. JSファイル はリソースを取得するため、サーバのサイトオリジンに対し HTTPリクエスト を行う
3. HTTPリクエストには、追加のHTTPヘッダとしてOrigin: http://example.comを付与する
4. リクエストを受けたAPIサーバは、JSONなどのリソースをHTTPレスポンスとしてリクエスト元へ返却する
5. HTTPレスポンスには、 `Access-Controll-Allow-http://example.com` が付与されていない 
6. CORS は許可されていないこととなり、リクエスト元はリソースを取得することができない

**クライアントで CORS の許可があるとき**
クライアントのサイトオリジンを `http://example.com`
サーバのサイトオリジンを`http://api.example.com`とする。

- クライアントは、クライアントのサイトオリジンへのリクエストを送り、リソースを取得するための JSファイル をダウンロードする
- JSファイルはリソースを取得するため、クライアントのサイトオリジンに対しHTTPリクエストを行う
- HTTPリクエストには、追加のHTTPヘッダとして`Origin: http://example.com`を付与する
- リクエストを受けたサーバのサイトオリジンは、 JSON などのリソースを HTTPレスポンス としてリクエスト元へ返却する
- HTTPレスポンスに追加のHTTPヘッダとして`Access-Controll-Allow-http://example.com`を付与する
- リクエスト元のオリジン`http://example.com`の CORS が許可されたため、リクエスト元はリソースを受け取ることができる

#### simple request について
1. 許可されているメソッドのうちいずれかであること
- GET, HEAD, POST
2. 手動で設定できるリクエストヘッダは以下のいずれかであること（ユーザエージェントによって自動的に付与されるヘッダーを除く） 
- Accept, Accept-Langage, Content-Langage, Content-Type
  - Content-Typeヘッダは以下のいずれかであること 
    - application/x-www-form-urlencoded, multipart/form-data, text/plain

#### preflight request
1. PUTリクエストでHTTPリクエストを送信 
2. simple request ではないため、preflight request を送信
3. preflight request は 
  - `OPTIONS api/ HTTP1.1` 
  - `Access-Control-Request-Method: PUT` 
  - `Origin: http://example.jp` といったHTTPヘッダを追加してHTTPリクエストを飛ばす。このとき、実際の内容はまだ送られていない。
4. preflight request が送られてきたサーバは、
   `Access-Control-Allow-Method: PUT`
   `Access-Control-Allow-Origin: http://example.com`
   のように許可するHTTPメソッド・オリジンの情報を返却する。
5. preflight request で許可が得られたため、PUTリクエストが送信される 
6. simple requestの手順と同じ

### CORSとは
あるオリジンで動作しているウェブアプリケーションに、異なるオリジンに選択されたリソースへのアクセス権を与えるようブラウザーに指示するための仕組み

#### オリジンとは
オリジンとは、Webサイトにアクセスするために使われるURLの スキーム（プロトコル）、ホスト（ドメイン）、ポート によって定義されたもの。

- URL:`http://example.com:8080/sample1/index.html`
  - スキーム: `http` 
  - ホスト: `example.com`
  - ポート: `:8080`

https://developer.mozilla.org/ja/docs/Glossary/Origin

Q. この設定が問題となるケースを1つ挙げて、なぜ設定するべきではないのか、説明してください
`Access-Control-Allow-Origin: *`


Q. preflight request が送信されない「シンプルなリクエスト」に該当するための条件を説明してください


Q. シンプルなリクエストの場合は preflight request が送信されず、そのままリクエストがサーバに到達します。
サーバからのレスポンスの`Access-Control-Allow-Originヘッダー`に、リクエスト送信元のオリジンが含まれない場合、ブラウザはどのような挙動を取るでしょうか？


Q. HTMLのaタグを辿って異なるオリジンに移動する際は、特にCORS制約は発生しません。なぜでしょうか？


Q. `XMLHttpRequest`を使ってクロスオリジンリクエストを発行する際、デフォルトの挙動だとリクエストにクッキーが含まれません。クッキー情報を含むためには、何をする必要があるでしょうか？

## 課題2


## 課題3
- この課題では、CORSを説明するためのモックを作成していただきます


### 仕様
特定のオリジンからのPOSTリクエストのみ許可して、それ以外のオリジンからPOSTリクエストを受けた時は、CORS制約によりアクセスが制限されるようなサーバを作成してください
「Simple request」の時はpreflightが行われないこと
「Simple request」に該当しないときはpreflightが行われることを証明してください

### 技術的な仕様
サーバはnode.jsとexpressで作成してください（以降の課題でも使うため）


- ヒント 
  - レスポンスヘッダーにAccess-Control-Allow-Originを設定する必要があるでしょう
  こちらもngrokを使うと楽でしょう

## 課題4
作成した成果物に、試しにCURLで、「Simple request」に該当しないPOSTリクエストを送信してみましょう
果たしてCURLからのリクエストを受けた時、CORS制約は適用されるでしょうか？
その理由を説明してください