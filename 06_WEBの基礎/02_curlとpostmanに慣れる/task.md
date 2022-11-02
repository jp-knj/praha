# curlとpostmanに慣れる 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/reczK1Tqg81nJoHpa?blocks=hide)

## 問題１
### 回答
**curlコマンド**
```shell
curl -H "X-Test: hello" "https://httpbin.org/headers"
```
**response**
```shell
{
  "headers": {
    "Accept": "*/*", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.79.1", 
    "X-Amzn-Trace-Id": "Root=1-63627311-755aff5278ea027817c0180e", 
    "X-Test": "hello"
  }
}
```

## 問題２
### 回答
**curlコマンド**
```shell
curl -H "Content-Type:application/json" -d "{\"name\":\"hoge\"}" "https://httpbin.org/post"
```
**response**
```shell
{
  "args": {}, 
  "data": "{\"name\":\"hoge\"}", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "15", 
    "Content-Type": "application/json", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.79.1", 
    "X-Amzn-Trace-Id": "Root=1-63627549-48ec70317d1a6ef305137f29"
  }, 
  "json": {
    "name": "hoge"
  }, 
  "origin": "", 
  "url": "https://httpbin.org/post"
}
```

## 問題３
### 回答
**curlコマンド**
```shell
curl -H "Content-Type:application/json" -d "{\"userA\": {\"name\": \"hoge\", \"age\": 29}}" "https://httpbin.org/post"
```
**response**
```shell
{
  "args": {}, 
  "data": "{\"userA\": {\"name\": \"hoge\", \"age\": 29}}", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "38", 
    "Content-Type": "application/json", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.79.1", 
    "X-Amzn-Trace-Id": "Root=1-63627645-425f4ce3340a29a82008ad4b"
  }, 
  "json": {
    "userA": {
      "age": 29, 
      "name": "hoge"
    }
  }, 
  "origin": "", 
  "url": "https://httpbin.org/post"
}
```

## 問題４
### 回答
**curlコマンド**
```shell
curl -H "Content-Type:application/x-www-form-urlencoded" -d "{\"name\":\"hoge\"}" "https://httpbin.org/post"
```
**response**
```shell
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "{\"name\":\"hoge\"}": ""
  }, 
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "15", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.79.1", 
    "X-Amzn-Trace-Id": "Root=1-636276d2-1f7a04a6432d76717411ec0d"
  }, 
  "json": null, 
  "origin": "", 
  "url": "https://httpbin.org/post"
}
```