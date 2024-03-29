# Webサービスの代表的な脆弱性を理解する 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recTGqGmmytK2UJAX?blocks=hide)

## 課題1
- 脆弱性の仕組み、発生し得る被害、対処法を解説してください
  - XSS
    - 攻撃者が悪意のあるクライアント側のコードをWebサイトに注入(injection)することができるセキュリティエクスプロイトのこと
      - 脆弱性の仕組み
        - 信頼されていないソース (多くの場合、リクエスト) を介してウェブアプリにデータが入力されたり、悪意のあるコンテンツが検証されずに動的なコンテンツがユーザーに送信されたりした場合に発生
        - クッキーのセッション情報などの個人情報を攻撃者に送信したり、攻撃者が管理するWebページに被害者をリダイレクトさせたり、脆弱性のあるサイトを装って悪意のある操作を行ったりすることが多い
        <img src="./persistent-xss-attack-wordpress.webp">
      - 攻撃手法の種類
        - Stored XSS attack
          - injected script は、ターゲットのサーバに永続されます。そして、被害者は、Webブラウザがデータのリクエストを送信すると、この悪意のある script をサーバから取得。
        - Reflected XSS attack 
          - ユーザがだまされて悪意のあるリンクをクリックしたり、細工されたフォームを送信したり、悪意のあるサイトを閲覧したりすると、注入されたコードは脆弱性のあるWebサイトに移動。Webサーバは、注入されたスクリプトを、エラーメッセージ、検索結果、またはリクエストの一部としてサーバに送信されたデータを含むその他のレスポンスなど、ユーザのブラウザに反映。ブラウザは、レスポンスがユーザが既にやり取りしたことのある「信頼できる」サーバからのものであると想定しているため、コードを実行。
        - DOM ベースの XSS attack 
          - payload は、元のクライアントサイドスクリプトが使用していた DOM 環境 を変更した結果、実行。ページ自体は変わりませんが、DOM 環境を悪意を持って改変した結果、ページに含まれるクライアント側のコードが予期せぬ形で実行。 
      - 発生し得る被害
        - ユーザの個人情報の流出
        - 攻撃者が他の個人情報を取得する
      - 対処法
        - データの無力化
        - データの検証
        - フィルターをエスケープする
  - コマンドインジェクション
    - 不正な入力を処理するプログラム内で、実行権限を持つユーザが入力したコマンドを実行する脆弱性のことである。
    - 発生し得る被害
      - 不正な入力を受け取った場合に、不正なコマンドが実行され、ユーザが意図しない操作が行われたり、重要な情報が窃取されたりなどが考えられる。
    - 対処法 
      - 入力値を正規表現による文字列置換により、コマンドを実行しない形式に変換してから実行する。
        - コマンドを実行する前に適切な入力チェックを行うなどの対策をとるのが望ましい。
        - 実行権限を持つユーザには厳重なアクセス管理を行い、不正なアクセスを防止することも重要である。
  - SQLインジェクション
    - Webサイトなどを構成するプログラムからSQL文を発行する際に、不正なSQL文を埋め込む攻撃手法のこと
      - 仕組みとしては、Webサイトなどを構成するプログラムがユーザーが入力した情報を元にSQL文を発行している際に、不正なSQL文を埋め込むことで、攻撃者が意図した動作を行わせる手法です。 
    - 発生し得る被害
      - データ改ざん、情報漏洩、サーバーの不正アクセスなどが挙げられます。 
    - 対処法
      - SQL文の文字列結合を防止することが重要。インジェクションを起こしやすい文字列をエスケープすることなども重要です。また、ログを取り、不正なアクセスがあったら早急に発見し、対処することが重要です。
  - CSRF(Cross-Site Request Forgery)
    - 別のWebサイトから悪意のある攻撃者が、Webアプリケーションの相手先を知らないユーザを操作させて、不正な処理を強制する攻撃行為。
    - 発生し得る被害
      - Webアプリケーションを操作して、悪意のあるユーザが認められない情報を閲覧したり、不正な情報を投稿したり、データを破壊したりする可能性があります。悪意のあるユーザが、他のユーザのアカウントにログインし、情報を変更したり、悪意のあるソフトウェアをインストールしたりする可能性がある
    - 対処法
      - CSRFを防ぐためにトークンを使用して、リクエストを認証することが推奨されています。また、CSRF対策を検証するために、CSRFテストツールを使用することも可能です。また、リクエストを検証するために、referrer情報を使用することも可能

[MDN/Types_of_attacks](https://developer.mozilla.org/ja/docs/Web/Security/Types_of_attacks)

## 課題2

## 課題3
### Damn Vulnerable Web Application の環境を立ち上げる
```
$ docker pull vulnerables/web-dvwa
$ docker run --rm -it -p 80:80 vulnerables/web-dvwa

## 開発環境のパス
http://127.0.0.1/login.php

username: admin, password: password
```

### コマンドインジェクション
#### 攻撃手法
```shell
## enter an IP Address
$ 127.0.0.1; whoami; hostname; ifconfig; ls ../

## response
PING 127.0.0.1 (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.055 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.104 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.127 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.103 ms

--- 127.0.0.1 ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.055/0.097/0.127/0.026 ms
www-data
d6bbe7e5c894
brute
captcha
csp
csrf
exec
fi
javascript
sqli
sqli_blind
upload
view_help.php
view_source.php
view_source_all.php
weak_id
xss_d
xss_r
xss_s
```

#### 有効な防御手段
- トークンを検証する
- `stripslashes` でコマンドの無効化など
  - `127.0.0.1; whoami;` →　`;` を無効化する 
<details>
<summary>コマンドインジェクションを防御するソース</summary>

```php
<?php
if( isset( $_POST[ 'Submit' ]  ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $target = $_REQUEST[ 'ip' ];
    $target = stripslashes( $target );

    // Split the IP into 4 octects
    $octet = explode( ".", $target );

    // Check IF each octet is an integer
    if( ( is_numeric( $octet[0] ) ) && ( is_numeric( $octet[1] ) ) && ( is_numeric( $octet[2] ) ) && ( is_numeric( $octet[3] ) ) && ( sizeof( $octet ) == 4 ) ) {
        // If all 4 octets are int's put the IP back together.
        $target = $octet[0] . '.' . $octet[1] . '.' . $octet[2] . '.' . $octet[3];

        // Determine OS and execute the ping command.
        if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
            // Windows
            $cmd = shell_exec( 'ping  ' . $target );
        }
        else {
            // *nix
            $cmd = shell_exec( 'ping  -c 4 ' . $target );
        }

        // Feedback for the end user
        echo "<pre>{$cmd}</pre>";
    }
    else {
        // Ops. Let the user name theres a mistake
        echo '<pre>ERROR: You have entered an invalid IP.</pre>';
    }
}

// Generate Anti-CSRF token
generateSessionToken();
```
</details>

### SQLインジェクション
#### 攻撃手法
```shell
## enter sql injection
$ ' UNION SELECT user, password FROM users#'

## response
ID: ' UNION SELECT user, password FROM users#'
First name: admin
Surname: 5f4dcc3b5aa765d61d8327deb882cf99
ID: ' UNION SELECT user, password FROM users#'
First name: gordonb
Surname: e99a18c428cb38d5f260853678922e03
ID: ' UNION SELECT user, password FROM users#'
First name: 1337
Surname: 8d3533d75ae2c3966d7e0d4fcc69216b
ID: ' UNION SELECT user, password FROM users#'
First name: pablo
Surname: 0d107d09f5bbe40cade3de5c71e9e9b7
ID: ' UNION SELECT user, password FROM users#'
First name: smithy
Surname: 5f4dcc3b5aa765d61d8327deb882cf99
```

#### 有効的な防御手段
- `stripslashes` を使用する
  - 入力文字内のシングルクォート(’)はダブルクォート(")に置換
- `mysql_real_escape_string` を使用する
  - すべての (') の前に (/)が追加
<details>
    <summary>SQLインジェクションを防御するソース</summary>

```php
<?php
if( isset( $_GET[ 'Submit' ] ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $id = $_GET[ 'id' ];

    // Was a number entered?
    if(is_numeric( $id )) {
        // Check the database
        $data = $db->prepare( 'SELECT first_name, last_name FROM users WHERE user_id = (:id) LIMIT 1;' );
        $data->bindParam( ':id', $id, PDO::PARAM_INT );
        $data->execute();
        $row = $data->fetch();

        // Make sure only 1 result is returned
        if( $data->rowCount() == 1 ) {
            // Get values
            $first = $row[ 'first_name' ];
            $last  = $row[ 'last_name' ];

            // Feedback for end user
            echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
        }
    }
}

// Generate Anti-CSRF token
generateSessionToken();
?>
```
</details>

[SQL_injectionの解説動画](https://www.youtube.com/watch?v=5bj1pFmyyBA)

### CSRF
#### 攻撃手法
- ダミーサイトを実装
```html
<form action="#" method="GET">
  New password:<br />
  <input type="password" AUTOCOMPLETE="off" name="password_new"><br />
  Confirm new password:<br />
  <input type="password" AUTOCOMPLETE="off" name="password_conf"><br />
  <br />
  <input type="submit" value="Change" name="Change">
</form>
```
- form-action を変更して、リクエストを送信
#### 有効な防御手段
- csrf の token を form に含める 
- cookie属性 に SameSite を Lax や Strict に設定

[CSRFトークン](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### XSS
#### 攻撃手法
- cookieを表示
```html
><script>window.alert(document.cookie)</script>

PHPSESSID=s391ihbvkbm74il0ghcgjkbvb4; security=low
```
#### 有効な防御手段
- `mysql_real_escape_string` を使用する
  - すべての (') の前に (/)が追加

## 課題4
OWASPが提供している[OWASP Top Ten](https://cheatsheetseries.owasp.org/IndexTopTen.html)に目を通してください。WEBサービスの代表的かつ深刻な脆弱性がリストアップされています。この中から脆弱性を1つを選び、あなたが現在開発しているサービスがその脆弱性に対処できていると思うか考えてみてください。

#### Broken Access Control について
アクセス制御が機能しないときに起こる脆弱性のことです。アクセス制御は、特定のユーザーやプログラムが特定のリソースにアクセスすることを許可するものですが、この脆弱性が発生すると、不正なユーザーやプログラムが特定のリソースにアクセスできてしまいます。このような脆弱性を攻撃されると、セキュリティ上の問題が発生してしまうため、適切な対策が必要です。

#### Broken Access Controlという脆弱性に対しては、次のような対策が考えられます。
アクセス制御を厳格に行う。不正なアクセスを防ぎ、セキュリティを確保するために、アクセス制御を厳格に行うことが重要です。例えば、特定のユーザーやプログラムに対して、特定のリソースへのアクセス権限を与えるなどの対策が考えられます。

パスワードを安全に管理する。パスワードは、ユーザーのアカウントを保護するための重要なツールです。そのため、パスワードを安全に管理することが重要です。例えば、複雑なパスワードを設定するようにすることで、不正なアクセスを防ぐことができます。また、パスワードを定期的に変更することも有効です。

適切な対応を行う。セキュリティ上の問題が発生した場合には、すぐに適切な対応を行うことが重要です。例えば、不正なアクセスが行われた場合には、すぐにアクセス権限を変更したり、セキュリティ対策を強化したりするなどの対応を行うことが必要です。また、問題が発生したことを管理者や関係者に通知し、速やかに対応することも大切です。
