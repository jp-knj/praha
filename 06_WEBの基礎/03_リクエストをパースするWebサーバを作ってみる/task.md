# リクエストをパースするWebサーバを作ってみる
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/rec1zgtkjqMEV5Fvk?blocks=hide)

## 課題１
- node.js と express で webサーバ を実装する

**curlコマンド**
```shell
kenji@jp-knj web-server % curl localhost:8080 -H "Content-Type: application/json"
```
**response**
```shell
{"text":"hello world"}%   
```

**curlコマンド**
```shell
kenji@jp-knj web-server % curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
```
**response**
```shell
{name: hoge}%   
```

**curlコマンド**
```shell
kenji@jp-knj web-server % curl localhost:8080 -d '{"name": "hoge"}'
```
**response**
```shell
400 Error: Use application/json%  
```

## 課題２
- Content-type に application/x-www-form-urlencoded を指定したとき
`application/x-www-form-urlencoded`: キーと値は、 '&' で区切られ、キーと値の組が '=' で結ばれた形でエンコードされます。キーや値が英数字以外の文字であった場合は、Percent Encoding されます。このため、このタイプはバイナリデータを扱うのには向きません

**具体例**
```shell
utf-8 basis： a=1&b=1 → %20a%3D1%26b%3D
```

- Content-type に application/json を指定したとき 
  - 送信するデータがJSON形式であることを明示。 