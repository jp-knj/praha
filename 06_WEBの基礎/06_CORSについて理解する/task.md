# CORS について理解する 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/rechlwfZXjs0yQPX7?blocks=hide)

## 課題１
以下の単語を使ってCORSの仕組みを説明してください
- preflight request
- simple request
- access-control-allow-origin


この設定が問題となるケースを1つ挙げて、なぜ設定するべきではないのか、説明してください
`Access-Control-Allow-Origin: *`


preflight request が送信されない「シンプルなリクエスト」に該当するための条件を説明してください


シンプルなリクエストの場合は preflight request が送信されず、そのままリクエストがサーバに到達します。
サーバからのレスポンスの`Access-Control-Allow-Originヘッダー`に、リクエスト送信元のオリジンが含まれない場合、ブラウザはどのような挙動を取るでしょうか？


HTMLのaタグを辿って異なるオリジンに移動する際は、特にCORS制約は発生しません。なぜでしょうか？


`XMLHttpRequest`を使ってクロスオリジンリクエストを発行する際、デフォルトの挙動だとリクエストにクッキーが含まれません。クッキー情報を含むためには、何をする必要があるでしょうか？

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